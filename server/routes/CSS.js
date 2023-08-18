const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
const {load} = require("cheerio");

let specs_added = {
    9: "Dermatología - **[Altered]**",
    20: "Medicina General - **[Altered]**",
    1: "Pediatria - **[Altered]**",
    54: "Odontologia - **[Altered]**",
    73: "Odontopediatría - **[Altered]**",
};

let form_data = {
    aseg_cedula: null,
    aseg_nombre: null,
    bene_cedula: null,
    bene_nombre: null,
    edad: null,
    total: null,
    tel_cel: null,
    tel_res: null,
    correo: null,
    direccion: null,
    cod_ue: null,
    cod_espe: null,
    cod_horario: null,
    cita_es: null,
    cod_medico: null,
    guardar: "SOLICITAR CITA",
};

let headers = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded",
};

let integrants = {
    Elio: {
        id_doc: "E-8-121759",
        dia: "24",
        mes: "08",
        anio: "1989",
        commit: "SOLICITAR",
    },
    Miguel: {
        id_doc: "YB6522137",
        dia: "17",
        mes: "05",
        anio: "2012",
        commit: "SOLICITAR",
    },
    Dylan: {
        id_doc: "8-1204-1207",
        dia: "14",
        mes: "07",
        anio: "2017",
        commit: "SOLICITAR",
    },
};

let urls = {
    base_url: "https://citas.css.gob.pa",
    validaDerechoUrl: "/valida_derecho.php",
    selectEspeUrl: "/select_espe.php",
    indexSolCitaAgUrl: "/index_sol_cita_ag.php",
};

let schedule_pref = {1: "CH", 2: "AM", 3: "PM"};

let appointent_type = {1: "Nueva", 2: "Control"};

// Track each url visited
axios.interceptors.request.use(
    (config) => {
        let fullURL = null;
        if (config.params) {
            fullURL = config.url + "?" + qs.stringify(config.params); // Construct full URL with params using qs.stringify
        } else {
            fullURL = config.url; // Construct full URL with params using qs.stringify
        }

        // console.log("Request URL:", fullURL);

        // console.log("Cookie:", config.headers.cookie);
        // console.log();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};

const update_mod_specialties = (original_data, new_data) => {
    for (const key in new_data) {
        if (!original_data.hasOwnProperty(key)) {
            original_data[key] = new_data[key];
        }
    }
    return original_data;
};

const validate_right = async (pacient_info) => {
    const response = await axios.post(urls.base_url + urls.validaDerechoUrl, qs.stringify(pacient_info), {
        headers: headers,
    });
    const $ = load(response.data);

    const inputs = $("input");
    const textarea = $("textarea").text();

    // iterates thru each elements attribute in the input cheerio data html element, and organizes them into one single object.
    const inputAttributes = inputs.get().reduce((attributes, element) => {
        const attributeName = $(element).attr("name");
        const attributeValue = $(element).attr("value");
        attributes[attributeName] = attributeValue;
        return attributes;
    }, {});
    form_data = Object.assign({}, form_data, inputAttributes);

    form_data["direccion"] = textarea;
    delete form_data.cita_es;
    delete form_data.cod_medico;
    delete form_data.cdigital;
    delete form_data.cancelar;

    // create the list of policlinicas available
    const policlinicas = $('select[name="cod_ue"] option')
        .get()
        .reduce((init_obj, element) => {
            const value = $(element).attr("value");
            if (value) {
                init_obj[value] = $(element).text();
            }
            return init_obj;
        }, {});
    return policlinicas;
};

const select_specialty = async (clinic_option = "1", headers) => {
    const params = {select: "cod_espe", opcion: clinic_option};
    const response = await axios.get(urls.base_url + urls.selectEspeUrl, {params: params, headers: headers});
    const $ = load(response.data);
    const available_specialties = $("option")
        .get()
        .reduce((empty_obj, element) => {
            if ($(element).attr("value")) {
                empty_obj[$(element).attr("value")] = $(element).text();
            }
            return empty_obj;
        }, {});

    update_mod_specialties(available_specialties, specs_added);
    return available_specialties;
};

const get_list_drs = async (specialty_option = "2") => {
    const params = {select: "cod_medico", opcion: specialty_option};
    const response = await axios.get(urls.base_url + urls.selectEspeUrl, {params: params, headers: headers});
    const $ = load(response.data);
    const list_of_drs = $("option")
        .get()
        .reduce((empty_dict, element) => {
            const value = $(element).attr("value");
            if (value) {
                empty_dict[value] = $(element).text();
            }
            return empty_dict;
        }, {});
    return list_of_drs;
};

const extrac_message = (html) => {
    const $ = load(html);
    // Select the <p> element containing the message
    const messageElement = $("p").eq(1); // Adjust the index as needed

    // Get the text content of the selected element
    return messageElement.text().trim();
};

const request_appointment = async (form_data, headers) => {
    const response = await axios.post(urls.base_url + urls.indexSolCitaAgUrl, qs.stringify(form_data), {
        headers: headers,
    });

    console.log(response.data);

    return extrac_message(response.data);
};

router.get("/consultar", async (req, res) => {
    // add initial cookies by default randomly generated in each request to "preserve session" during the sequence of each url visited
    headers["cookie"] = `PHPSESSID=${generateRandomString(80)}`;

    form_data.aseg_cedula = req.query.id_doc;
    form_data.dia = req.query.dia;
    form_data.mes = req.query.mes;
    form_data.anio = req.query.anio;
    const policlinicas = await validate_right(req.query);

    res.json({headers: headers, form_data: form_data, policlinicas: policlinicas});
});

router.post("/solicitar", async (req, res) => {
    const headers = req.body.params.headers;
    const form_data = req.body.params.form_data;

    // await select_specialty(form_data.cod_ue, headers);
    //  later select the specialty and *** save that option number to a variable, to pass it as argument in select_specialty ****
    // if (form_data["cita_es"] == "control") {
    //     // request and get the list of available drs (Optional: Only works if you had an appointment before.).
    //     const list_of_drs = await get_list_drs();
    // }

    const message_response = await request_appointment(form_data, headers);

    res.send(message_response);
});

module.exports = router;

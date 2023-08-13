const axios = require("axios");

function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

const validate_right = async () => {
    const data = {
        id_doc: "E-8-121759",
        dia: "24",
        mes: "08",
        anio: "1989",
        commit: "SOLICITAR",
    };
    const dataForm = new URLSearchParams(data).toString();

    const response = await axios.post("https://citas.css.gob.pa/valida_derecho.php", dataForm, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.75 Safari/537.36",
            cookie: `PHPSESSID=${generateRandomString(80)}`,
        },
    });

    console.log(response.data);
};

validate_right();

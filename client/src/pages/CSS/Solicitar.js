import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const MultiOptionDropdown = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {state} = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const server_url = "http://localhost:3001/";

    const specialties = {
        8: "Cirugía General",
        9: "Dermatología",
        37: "Estimulación Temprana",
        39: "Fonoaudiología",
        5: "Gineco-Obstetricia",
        2: "Medicina Familiar",
        75: "Medicina Fisica y Rehabilitacion",
        20: "Medicina General",
        3: "Medicina Interna",
        53: "Nutrición",
        12: "Oftalmología",
        13: "Otorrinolaringología",
        1: "Pediatria",
        67: "Salud Ocupacional ",
        68: "Tecnica Electrocardiografia",
        17: "Urologia",
        54: "Odontologia - **[Altered]**",
        73: "Odontopediatría - **[Altered]**",
    };
    const schedule_pref = {1: "CH", 2: "AM", 3: "PM"};

    const appointent_type = {1: "Nueva", 2: "Control"};

    const handleOptionChange = (event) => {
        Array.from(event.target.selectedOptions).reduce((obj, option) => {
            setSelectedOptions(option.value);
            state.form_data[option.id] = option.value;
            return 1;
        }, []);
    };

    const submit_data = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await axios.post(`${server_url}css/solicitar`, {
            params: {form_data: state.form_data, headers: state.headers},
        });

        setIsLoading(false);
        navigate("/solicitud", {state: response.data});
    };

    return (
        <div>
            <h1>Select Options:</h1>
            <div>
                <h2>Seleccione la Policlínica</h2>
                <select multiple onChange={handleOptionChange}>
                    {Object.keys(state.policlinicas).map((option, index) => (
                        <option value={index + 1} id="cod_ue">
                            {state.policlinicas[option]}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Seleccione el Servicio Solicitado</h2>
                <select multiple onChange={handleOptionChange}>
                    {Object.keys(specialties).map((key) => {
                        return (
                            <option value={key} id="cod_espe">
                                {specialties[key]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <h2>Preferencia horaria de la atención</h2>
                <select multiple onChange={handleOptionChange}>
                    {Object.keys(schedule_pref).map((key) => {
                        return (
                            <option value={schedule_pref[key]} id="cod_horario">
                                {schedule_pref[key]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <h2>Su cita es?</h2>
                <select multiple onChange={handleOptionChange}>
                    {Object.keys(appointent_type).map((key) => {
                        return (
                            <option value={appointent_type[key]} id="cita_es">
                                {appointent_type[key]}
                            </option>
                        );
                    })}
                </select>
            </div>
            <br></br>
            <form onSubmit={submit_data}>
                <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    );
};

export default MultiOptionDropdown;

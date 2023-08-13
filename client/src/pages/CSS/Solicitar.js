import React, {useState} from "react";
const form_data = {
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

const MultiOptionDropdown = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const policlinicas = [
        "Policlínica Generoso Guardia (Santa Librada)",
        "Policlínica Manuel Ferrer Valdes (Calle 25)",
        "Policlínica Manuel Maria Valdes (San Miguelito)",
        "Policlínica Alejandro De La Guardia Hijo (Bethania)",
        "Policlínica Joaquin Jose Vallarino (Juan Diaz)",
        "Policlínica Carlos N Brin (San Francisco)",
        "Policlinica Presidente Remon (Calle 17)",
        "Policlínica Nuevo San Juan (Colón, NSJ)",
        "Policlínica Especializada Dr. Hugo Spadafora (Colón, HS)",
        "Policlínica Especializada de Sabanitas (Colón, Sabanitas)",
        "Hospital Raúl Dávila Mena (Hospital Changuinola)",
        "Policlínica Santiago Barraza (La Chorrera)",
        "Policlinica Especializada Dr. Miguel Cardenas Barahona(Las Tablas)",
        "Policlínica Dr. Blas D. Gómez Ch. (Arraijan)",
        "Policlínica San Juan de Dios (Los Santos)",
        "Policlínica Juan Vega Mendez (San Carlos)",
        "Policlínica de Cañitas(Cañita)",
    ];
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
            form_data[option.id] = option.value;
            console.log(form_data);
        }, []);
    };

    return (
        <div>
            <h1>Select Options:</h1>
            <div>
                <h2>Seleccione la Policlínica</h2>
                <select multiple onChange={handleOptionChange}>
                    {policlinicas.map((option, index) => (
                        <option value={index + 1} id="cod_ue">
                            {option}
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
        </div>
    );
};

export default MultiOptionDropdown;

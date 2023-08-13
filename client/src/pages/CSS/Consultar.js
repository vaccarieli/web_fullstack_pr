import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // Import useNavigate from react-router-dom

function Consultar() {
    const server_url = "http://localhost:3001/";

    const navigate = useNavigate(); // Create a navigate function

    const [isLoading, setIsLoading] = useState(false);
    const [inputValues, setInputValues] = useState({
        id_doc: "",
        dia: "",
        mes: "",
        anio: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const request_user_info = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.get(`${server_url}css`, {
                params: {
                    ...inputValues,
                    commit: "SOLICITAR",
                },
            });

            console.log(response.data);

            // Redirect using the navigate function
            navigate("/solicitar"); // Replace with your desired path
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={request_user_info}>
                {/* Input fields */}
                {Object.keys(inputValues).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        value={inputValues[key]}
                        onChange={handleInputChange}
                        placeholder={key === "id_doc" ? "Cedula" : key}
                    />
                ))}
                {/* Button */}
                <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    );
}

export default Consultar;

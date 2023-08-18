import {useLocation} from "react-router-dom";

function Solicitud() {
    const {state} = useLocation();

    return <div>{state}</div>;
}

export default Solicitud;

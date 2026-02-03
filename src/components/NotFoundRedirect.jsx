import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAlert } from "./components/AlertContext";
import { useLocation } from "react-router-dom";


const NotFoundRedirect = () => {
    const { showAlert } = useAlert();
    const location = useLocation();

    useEffect(() => {
        showAlert(`De pagina ${location.pathname} bestaat niet`, "danger");
    }, []);

    return <Navigate to="/" replace />;
};

export default NotFoundRedirect;

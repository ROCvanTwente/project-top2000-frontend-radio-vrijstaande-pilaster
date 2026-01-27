import React, { use } from "react";
import { Navigate } from "react-router-dom";
import { useAlert } from "./AlertContext.jsx";

function ProtectedRoute({ isAuthenticated, children }) {
    const { showAlert } = useAlert();

    if (!isAuthenticated) {
        showAlert("Je hebt geen toegang tot deze pagina.", "danger");
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;

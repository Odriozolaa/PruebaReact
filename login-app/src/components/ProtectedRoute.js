import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {/* Renderizar el contenido protegido */}
            {children}
        </>
    );
};

export default ProtectedRoute;

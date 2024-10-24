import React from "react";
import { Navigate } from "react-router-dom";
import Logout from './Logout';


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
    return <Navigate to="/login" />;
    }

    return (
        <div>
          {/* Mostrar el contenido protegido */}
            {children}
    
          {/* Botón de Logout */}
            <Logout />  {/* Reutilizar el componente de Logout */}
        </div>
    );
};
export default ProtectedRoute;

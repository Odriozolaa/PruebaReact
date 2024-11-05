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
          <h1>Esta es una página protegida. Solo puedes verla si has iniciado sesión.</h1>
          {/* Mostrar el contenido protegido */}
            {children}
          
          {/* Botón de Logout */}
            <Logout />  {/* Reutilizar el componente de Logout */}
        </div>
    );
};
export default ProtectedRoute;

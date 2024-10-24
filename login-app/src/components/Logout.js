// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';  // Importa la función de logout

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Eliminar el token del localStorage
        navigate('/login');  // Redirigir al login después de cerrar sesión
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Cerrar sesión
        </button>
    );
};

export default Logout;

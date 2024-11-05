// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Button color="inherit" onClick={handleLogout}>
            Logout
        </Button>
    );
}

export default Logout;

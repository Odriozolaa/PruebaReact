// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/authService';
import { TextField, Button } from '@mui/material';
import FormContainer from './FormContainer';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: handleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Llamar al servicio de login
            const token = await login(email, password);
            handleLogin(token);
            navigate('/'); // Redirige a la página principal o protegida
        } catch (err) {
            setError(err.message);
        }
    };
return (
        <FormContainer title="Login" error={error} onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login
                </Button>
        </FormContainer>
    );
}

export default Login;

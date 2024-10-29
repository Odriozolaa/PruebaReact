// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { TextField, Button } from '@mui/material';
import FormContainer from './FormContainer';

function Register() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Llamar al servicio de registro
        await register(email, password);
        setSuccess('Registered successfully! Please login.');
        setError('');
        navigate('/login'); // Redirigir a la página de login después de registrarse
    } catch (err) {
        setError(err.message);
        setSuccess('');
    }
};
return (
        <FormContainer title="Register" error={error} success={success} onSubmit={handleSubmit}>
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
                Register
            </Button>
        </FormContainer>
    );
}

export default Register;

// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

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
        <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;

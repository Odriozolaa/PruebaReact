// src/components/GradoForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGrado } from '../services/gradoService';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import FormContainer from './FormContainer';

function GradoForm() {
    const [nombre, setNombre] = useState('');
    const [cantidadAlumnos, setCantidadAlumnos] = useState('');
    const [error, setError] = useState('');
    const { token } = useAuth(); 
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            setError('Debes iniciar sesión para crear un grado');
            return;
        }

        try {
            await createGrado(token, { nombre, cantidad_alumnos: cantidadAlumnos });
            navigate('/'); // Cambia el destino si es necesario
        } catch (err) {
            setError('Error al crear el grado. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer title="Crear Grado" error={error} onSubmit={handleSubmit}>
            <TextField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Cantidad de Alumnos"
                type="number"
                value={cantidadAlumnos}
                onChange={(e) => setCantidadAlumnos(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Crear
            </Button>
        </FormContainer>
    );
}

export default GradoForm;

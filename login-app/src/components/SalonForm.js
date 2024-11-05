import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSalon } from '../services/salonService';
import { TextField, Button } from '@mui/material';
import FormContainer from './FormContainer';

function SalonForm() {
    const [nombre, setNombre] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createSalon({ nombre, capacidad });
            navigate('/salones');
        } catch (err) {
            setError('Error al crear el salón. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer title="Crear Salón" error={error} onSubmit={handleSubmit}>
            <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth required margin="normal" />
            <TextField label="Capacidad" type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} fullWidth required margin="normal" />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Crear</Button>
        </FormContainer>
    );
}

export default SalonForm;

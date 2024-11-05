import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMaestro } from '../services/maestroService';
import { TextField, Button } from '@mui/material';
import FormContainer from './FormContainer';

function MaestroForm() {
    const [nombre, setNombre] = useState('');
    const [materia, setMateria] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createMaestro({ nombre, materia });
            navigate('/maestros');
        } catch (err) {
            setError('Error al crear el maestro. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer title="Crear Maestro" error={error} onSubmit={handleSubmit}>
            <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth required margin="normal" />
            <TextField label="Materia" value={materia} onChange={(e) => setMateria(e.target.value)} fullWidth required margin="normal" />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Crear</Button>
        </FormContainer>
    );
}

export default MaestroForm;

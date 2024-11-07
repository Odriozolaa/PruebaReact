import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMaestro } from '../services/maestroService';
import { TextField, Button } from '@mui/material';
import FormContainer from './FormContainer';
import { useAuth } from '../contexts/AuthContext';

function MaestroForm() {
    const [nombre, setNombre] = useState('');
    const [materia, setMateria] = useState('');
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
            setError('Debes iniciar sesión para crear un maestro');
            return;
        }
        
        try {
            const token = localStorage.getItem('token'); // Obtén el token desde el almacenamiento local
            await createMaestro(token, { nombre, materia }); // Pasa el token como primer argumento
            navigate('/');
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

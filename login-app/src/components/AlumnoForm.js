// src/components/AlumnoForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import { getGrados } from '../services/gradoService';
import { createAlumno } from '../services/alumnoService';
import { useAuth } from '../contexts/AuthContext';

function AlumnoForm() {
    const [nombre, setNombre] = useState('');
    const [gradoId, setGradoId] = useState(null); // Inicializado en null
    const [grados, setGrados] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    
    useEffect(() => {
        async function fetchGrados() {
            try {
                const gradosData = await getGrados(token); // Verificar que se están obteniendo grados
                setGrados(gradosData);
            } catch (err) {
                setError('Error al obtener los grados');
            }
        }
        if (token) {
            fetchGrados();
        } else {
            setError('Necesitas iniciar sesión');
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !gradoId) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            await createAlumno(token, { 
                nombre, 
                grado_id: gradoId,
                es_nuevo: false,
                restricciones_no_juntos: [],
                problemas_comportamiento_con: [],
                relaciones_romanticas_con: []
            });
            alert("Alumno registrado exitosamente");
            navigate('/');
        } catch (err) {
            setError('Error al registrar el alumno. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer title="Registrar Alumno" error={error} onSubmit={handleSubmit}>
            <TextField
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                fullWidth
                margin="normal"
            />

            <Autocomplete
                options={grados}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, value) => {
                    setGradoId(value ? value.id : null);
                }}
                renderInput={(params) => <TextField {...params} label="Grado" required />}
                fullWidth
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrar Alumno
            </Button>
        </FormContainer>
    );
}

export default AlumnoForm;

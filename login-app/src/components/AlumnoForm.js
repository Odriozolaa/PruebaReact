// src/components/AlumnoForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete} from '@mui/material';
import FormContainer from './FormContainer';
import { getGrados } from '../services/gradoService';

function AlumnoForm({ onSubmit }) {
    const [nombre, setNombre] = useState('');
    const [esNuevo, setEsNuevo] = useState(false);
    const [gradoId, setGradoId] = useState('');
    const [grados, setGrados] = useState([]);

    useEffect(() => {
        async function fetchGrados() {
            const response = await getGrados();
            setGrados(response);
        }
        fetchGrados();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            nombre,
            esNuevo,
            grado_id: gradoId,
        });
    };

    return (
        <FormContainer title="Registrar Alumno" onSubmit={handleSubmit}>
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
                onChange={(event, value) => setGradoId(value?.id || '')}
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

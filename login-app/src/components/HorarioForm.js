import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import FormContainer from './FormContainer';
import { getGrados } from '../services/gradoService';
import { getMaestros } from '../services/maestroService';
import { createHorario } from '../services/horarioService';
import { useAuth } from '../contexts/AuthContext';

function HorarioForm() {
    const [dia, setDia] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [gradoId, setGradoId] = useState('');
    const [maestroId, setMaestroId] = useState('');
    const [grados, setGrados] = useState([]);
    const [maestros, setMaestros] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchData() {
            if (token) {  // Verifica si el token existe antes de hacer las solicitudes
                try {
                    const gradosData = await getGrados(token);
                    const maestrosData = await getMaestros(token);
                    setGrados(gradosData);
                    setMaestros(maestrosData);
                } catch (err) {
                    setError('Error al obtener los grados o maestros');
                }
            }
        }
        fetchData();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createHorario(token, {
                dia,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                grado_id: gradoId,
                maestro_id: maestroId,
            });
            alert("Horario registrado exitosamente");
        } catch (err) {
            setError('Error al registrar el horario. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer title="Registrar Horario" error={error} onSubmit={handleSubmit}>
            <TextField
                label="Día"
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Hora Inicio"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Hora Fin"
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
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
            <Autocomplete
                options={maestros}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, value) => setMaestroId(value?.id || '')}
                renderInput={(params) => <TextField {...params} label="Maestro" required />}
                fullWidth
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrar Horario
            </Button>
        </FormContainer>
    );
}

export default HorarioForm;

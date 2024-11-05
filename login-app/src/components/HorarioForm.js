import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import FormContainer from './FormContainer';
import { getGrados} from '../services/gradoService';
import { getMaestros } from '../services/maestroService';

function HorarioForm({ onSubmit }) {
    const [dia, setDia] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [gradoId, setGradoId] = useState('');
    const [maestroId, setMaestroId] = useState('');
    const [grados, setGrados] = useState([]);
    const [maestros, setMaestros] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const grados = await getGrados();
            const maestros = await getMaestros();
            setGrados(grados);
            setMaestros(maestros);
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            dia,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            grado_id: gradoId,
            maestro_id: maestroId
        });
    };

    return (
        <FormContainer title="Registrar Horario" onSubmit={handleSubmit}>
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

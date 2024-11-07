import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import FormContainer from './FormContainer';
import { getGrados } from '../services/gradoService';
import { getAlumnosByGrado, updateAlumno } from '../services/alumnoService';
import { useAuth } from '../contexts/AuthContext';

function AlumnoDetailForm() {
    const [grados, setGrados] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedGrado, setSelectedGrado] = useState(null);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [restriccionesNoJuntos, setRestriccionesNoJuntos] = useState([]);
    const [problemasComportamientoCon, setProblemasComportamientoCon] = useState([]);
    const [relacionesRomanticasCon, setRelacionesRomanticasCon] = useState([]);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        async function fetchGrados() {
            try {
                const gradosData = await getGrados(token);
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

    const handleGradoChange = async (event, value) => {
        setSelectedGrado(value);
        setSelectedAlumno(null); 
        if (value && token) {
            try {
                const alumnosData = await getAlumnosByGrado(value.id, token);
                setAlumnos(alumnosData);
            } catch (err) {
                setError('Error al obtener los alumnos de este grado');
            }
        }
    };

    const handleAlumnoChange = (event, value) => {
        setSelectedAlumno(value);
        if (value) {
            setRestriccionesNoJuntos(value.restricciones_no_juntos || []);
            setProblemasComportamientoCon(value.problemas_comportamiento_con || []);
            setRelacionesRomanticasCon(value.relaciones_romanticas_con || []);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedAlumno) {
            setError("Selecciona un alumno para actualizar");
            return;
        }
        try {
            console.log(token)
            await updateAlumno(selectedAlumno.id, {
                restricciones_no_juntos: restriccionesNoJuntos.map(alumno => alumno.id),
                problemas_comportamiento_con: problemasComportamientoCon.map(alumno => alumno.id),
                relaciones_romanticas_con: relacionesRomanticasCon.map(alumno => alumno.id)
            }, token);
            alert('Detalles actualizados con éxito');
        } catch (err) {
            setError('Error al actualizar los detalles del alumno');
        }
    };

    return (
        <FormContainer title="Actualizar Detalles del Alumno" error={error} onSubmit={handleSubmit}>
            <Autocomplete
                options={grados}
                getOptionLabel={(option) => option.nombre}
                onChange={handleGradoChange}
                renderInput={(params) => <TextField {...params} label="Seleccionar Grado" required />}
                fullWidth
                margin="normal"
            />

            {selectedGrado && (
                <Autocomplete
                    options={alumnos}
                    getOptionLabel={(option) => option.nombre}
                    onChange={handleAlumnoChange}
                    renderInput={(params) => <TextField {...params} label="Seleccionar Alumno" required />}
                    fullWidth
                    margin="normal"
                />
            )}

            {selectedAlumno && (
                <>
                    <Autocomplete
                        multiple
                        options={alumnos}
                        getOptionLabel={(option) => option.nombre}
                        value={restriccionesNoJuntos}
                        onChange={(event, value) => setRestriccionesNoJuntos(value)}
                        renderInput={(params) => <TextField {...params} label="Restricciones (No junto a)" />}
                        fullWidth
                        margin="normal"
                    />

                    <Autocomplete
                        multiple
                        options={alumnos}
                        getOptionLabel={(option) => option.nombre}
                        value={problemasComportamientoCon}
                        onChange={(event, value) => setProblemasComportamientoCon(value)}
                        renderInput={(params) => <TextField {...params} label="Problemas de Comportamiento Con" />}
                        fullWidth
                        margin="normal"
                    />

                    <Autocomplete
                        multiple
                        options={alumnos}
                        getOptionLabel={(option) => option.nombre}
                        value={relacionesRomanticasCon}
                        onChange={(event, value) => setRelacionesRomanticasCon(value)}
                        renderInput={(params) => <TextField {...params} label="Relaciones Románticas Con" />}
                        fullWidth
                        margin="normal"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Actualizar Detalles
                    </Button>
                </>
            )}
        </FormContainer>
    );
}

export default AlumnoDetailForm;

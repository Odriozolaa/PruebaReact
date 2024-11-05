import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import FormContainer from './FormContainer';
import { getAlumnosByGrado } from '../services/alumnoService';

function AlumnoDetailForm({ onSubmit, alumno }) {
    const [restriccionesNoJuntos, setRestriccionesNoJuntos] = useState([]);
    const [problemasComportamientoCon, setProblemasComportamientoCon] = useState([]);
    const [relacionesRomanticasCon, setRelacionesRomanticasCon] = useState([]);
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        async function fetchAlumnos() {
            // Verifica que el objeto alumno y su grado_id existan antes de intentar hacer la solicitud
            if (alumno?.grado_id) {
                const response = await getAlumnosByGrado(alumno.grado_id);
                // Filtra el alumno actual para evitar que aparezca como opción para sí mismo
                setAlumnos(response.filter(a => a.id !== alumno.id));
            }
        }
        fetchAlumnos();
    }, [alumno?.grado_id, alumno?.id]); // Usa la notación optional chaining para evitar errores si alumno no está definido

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            restricciones_no_juntos: restriccionesNoJuntos,
            problemas_comportamiento_con: problemasComportamientoCon,
            relaciones_romanticas_con: relacionesRomanticasCon
        });
    };

    return (
        <FormContainer title={`Detalles de ${alumno?.nombre || 'Alumno'}`} onSubmit={handleSubmit}>
            <Autocomplete
                multiple
                options={alumnos}
                getOptionLabel={(option) => option.nombre}
                value={restriccionesNoJuntos.map(id => alumnos.find(a => a.id === id) || {})}
                onChange={(event, value) => setRestriccionesNoJuntos(value.map(v => v.id))}
                renderInput={(params) => <TextField {...params} label="Restricciones (No junto a)" />}
                fullWidth
                margin="normal"
            />

            <Autocomplete
                multiple
                options={alumnos}
                getOptionLabel={(option) => option.nombre}
                value={problemasComportamientoCon.map(id => alumnos.find(a => a.id === id) || {})}
                onChange={(event, value) => setProblemasComportamientoCon(value.map(v => v.id))}
                renderInput={(params) => <TextField {...params} label="Problemas de comportamiento con" />}
                fullWidth
                margin="normal"
            />

            <Autocomplete
                multiple
                options={alumnos}
                getOptionLabel={(option) => option.nombre}
                value={relacionesRomanticasCon.map(id => alumnos.find(a => a.id === id) || {})}
                onChange={(event, value) => setRelacionesRomanticasCon(value.map(v => v.id))}
                renderInput={(params) => <TextField {...params} label="Relaciones Románticas Con" />}
                fullWidth
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Guardar Detalles
            </Button>
        </FormContainer>
    );
}

export default AlumnoDetailForm;

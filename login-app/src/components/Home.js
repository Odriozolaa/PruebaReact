import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
        <h1>Bienvenido</h1>
        <Link to="/grado">Crear Grado</Link>
        <Link to="/alumno">Crear Alumno</Link>
        <Link to="/salon">Crear Salón</Link>
        <Link to="/maestro">Crear Maestro</Link>
        <Link to="/horario">Crear Horario</Link>
        </div>
    );
};

export default Home;
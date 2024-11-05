import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from "./components/ProtectedRoute";
import GradoForm from './components/GradoForm';
import AlumnoForm from './components/AlumnoForm';
import SalonForm from './components/SalonForm';
import MaestroForm from './components/MaestroForm';
import HorarioForm from './components/HorarioForm';
import AlumnoDetailForm from './components/AlumnoDetailForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/grado" element={<GradoForm />} />
        <Route path="/alumno" element={<AlumnoForm />} />
        <Route path="/detallesa" element={<AlumnoDetailForm />} />
        <Route path="/salon" element={<SalonForm />} />
        <Route path="/maestro" element={<MaestroForm />} />
        <Route path="/horario" element={<HorarioForm />} />
        <Route path="/protected" element={<ProtectedRoute/>} />
        
      </Routes>
    </Router>
  );
}

export default App;


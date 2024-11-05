import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route 
            path="/grado" 
            element={
              <ProtectedRoute>
                <GradoForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alumno" 
            element={
              <ProtectedRoute>
                <AlumnoForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/detallesa" 
            element={
              <ProtectedRoute>
                <AlumnoDetailForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/salon" 
            element={
              <ProtectedRoute>
                <SalonForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/maestro" 
            element={
              <ProtectedRoute>
                <MaestroForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/horario" 
            element={
              <ProtectedRoute>
                <HorarioForm />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


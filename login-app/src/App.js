import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <h1>Esta es una página protegida. Solo puedes verla si has iniciado sesión.</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


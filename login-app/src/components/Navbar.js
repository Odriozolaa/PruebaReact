// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        My App
                    </Link>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    {!token ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/grado">Grado</Button>
                            <Button color="inherit" component={Link} to="/alumno">Alumno</Button>
                            <Button color="inherit" component={Link} to="/detallesa">Detalles</Button>
                            <Button color="inherit" component={Link} to="/salon">Salon</Button>
                            <Button color="inherit" component={Link} to="/maestro">Maestro</Button>
                            <Button color="inherit" component={Link} to="/horario">Horario</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

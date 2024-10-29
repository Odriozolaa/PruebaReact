// src/components/FormContainer.js
import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';

function FormContainer({ title, children, error, success, onSubmit }) {
    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main' }}>
                {title}
            </Typography>
            <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}
                {children}
            </Box>
        </Container>
    );
}

export default FormContainer;

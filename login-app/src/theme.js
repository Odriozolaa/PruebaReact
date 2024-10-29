import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#1976d2', // azul predeterminado de MUI
        },
        secondary: {
        main: '#ff4081', // rosa predeterminado de MUI
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
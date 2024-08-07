import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const AppContainer = styled('div')({
    minHeight: '100vh',
    padding: '20px',
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer>
                <WeatherDashboard />
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;

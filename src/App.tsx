import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4f9a94', 
        },
        secondary: {
            main: '#ffffff', 
        },
    },
});

const AppContainer = styled('div')({
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(to bottom, rgba(0, 188, 212, 0.4), rgba(76, 175, 80, 0.4))', 
});

const AppHeader = styled('header')({
    backgroundColor: '#4f9a94', 
    color: '#ffffff', 
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '20px',
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer>
                <AppHeader>
                    <h1>Weather Dashboard</h1>
                </AppHeader>
                <WeatherDashboard />
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;

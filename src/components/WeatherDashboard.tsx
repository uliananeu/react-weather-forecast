import React, { useState, useEffect } from 'react';
import { getWeather, getForecast, getDayOfWeek } from '../weatherService';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import { TextField, Button, Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import LoaderComponent from './Loader';

const AppBackground = styled('div')({
    minHeight: '100vh',
    padding: '0px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%'
});

const SearchBox = styled(Box)({
    backgroundColor: '#ffffff', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto', 
    marginBottom: '20px',
});

const SearchField = styled(TextField)({
    backgroundColor: '#ffffff', 
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
    '& input::placeholder': {
        color: '#b0bec5', 
    },
    '& label': {
        color: '#b0bec5', 
    },
});

const SearchButton = styled(Button)({
    backgroundColor: '#4f9a94', 
    color: '#ffffff', 
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#388e8d', 
    },
    width: '60%', 
});

const StyledContainer = styled(Container)({
    padding: '20px',
    textAlign: 'center',
});

const TodayCard = styled(Grid)({
    width: '90%', 
    maxWidth: '900px', 
});

const WeatherDashboard: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<any | null>(null);
    const [forecast, setForecast] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const fetchWeather = async () => {
        setLoading(true); 
        setError(null);   

        console.log("Fetching weather data..."); 
        try {
            const weatherData = await getWeather(city);
            setWeather(weatherData);

            const forecastData = await getForecast(city);
            const dailyForecasts = forecastData.list.filter((_: any, index: number) => index % 8 === 0); 
            setForecast(dailyForecasts.slice(1, 7).map((item: any) => ({
                ...item,
                day: getDayOfWeek(item.dt_txt),
            }))); 
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather data. Please check the city name or API key.');
        }
        setLoading(false); 
        console.log("Weather data loaded."); 
    };

    return (
        <AppBackground>
            <StyledContainer>
                <SearchBox>
                    <SearchField
                        label="Enter a city name"
                        placeholder="E.g., Helsinki, New York, London"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <SearchButton
                        variant="contained"
                        onClick={fetchWeather}
                        fullWidth
                    >
                        Search
                    </SearchButton>
                </SearchBox>
                
                {}
                {error && <Typography color="error">{error}</Typography>}

                {}
                {loading && <LoaderComponent />}

                {}
                {!loading && weather && (
                    <>
                        <Grid container spacing={2} marginTop={2} direction="column" alignItems="center">
                            <TodayCard item xs={12}>
                                <WeatherCard
                                    temperature={weather.main.temp}
                                    description={weather.weather[0].description}
                                    humidity={weather.main.humidity}
                                    icon={weather.weather[0].icon}
                                />
                            </TodayCard>
                            <Grid container spacing={2} marginTop={2}>
                                {forecast.map((forecastItem, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <ForecastCard
                                            day={forecastItem.day}
                                            temperature={forecastItem.main.temp}
                                            description={forecastItem.weather[0].description}
                                            icon={forecastItem.weather[0].icon}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </>
                )}
            </StyledContainer>
        </AppBackground>
    );
};

export default WeatherDashboard;
import React, { useState, useEffect } from 'react';
import { getWeather, getForecast, getDayOfWeek } from '../weatherService';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import { TextField, Button, Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const AppBackground = styled('div')({
    background: 'linear-gradient(to bottom, rgba(0, 188, 212, 0.4), rgba(76, 175, 80, 0.4))', // Градиент с прозрачностью
    minHeight: '100vh',
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%'
});

const SearchBox = styled(Box)({
    backgroundColor: 'transparent', // Оставляем прозрачным
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto', // Центрирование по горизонтали
    marginBottom: '20px',
});

const SearchField = styled(TextField)({
    backgroundColor: '#ffffff', // Белый фон для текстового поля
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
});

const SearchButton = styled(Button)({
    backgroundColor: '#1976d2', // Синий фон для кнопки
    color: '#ffffff', // Белый текст на кнопке
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#1565c0', // Темнее синий при наведении
    },
    width: '60%', // Кнопка на всю ширину блока поиска
});

const StyledContainer = styled(Container)({
    padding: '20px',
    textAlign: 'center',
});

const TodayCard = styled(Grid)({
    width: '80%', // Карточка на всю ширину контейнера
    maxWidth: '800px', // Максимальная ширина для первой карточки
});

const WeatherDashboard: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<any | null>(null);
    const [forecast, setForecast] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        try {
            setError(null);
            const weatherData = await getWeather(city);
            setWeather(weatherData);

            const forecastData = await getForecast(city);
            const dailyForecasts = forecastData.list.filter((_: any, index: number) => index % 8 === 0); // Каждые 24 часа
            setForecast(dailyForecasts.slice(1, 7).map((item: any) => ({
                ...item,
                day: getDayOfWeek(item.dt_txt),
            }))); // Прогноз на 6 дней
        } catch (err) {
            setError('Failed to fetch weather data. Please check the city name or API key.');
        }
    };

    return (
        <AppBackground>
            <StyledContainer>
                <SearchBox>
                    <SearchField
                        label="City"
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
                        Get Weather
                    </SearchButton>
                </SearchBox>
                {error && <Typography color="error">{error}</Typography>}
                {weather && (
                    <>
                        <Grid container spacing={2} marginTop={2} direction="column" alignItems="center">
                            <TodayCard item xs={12}>
                                <WeatherCard
                                    city={weather.name}
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
}

export default WeatherDashboard;

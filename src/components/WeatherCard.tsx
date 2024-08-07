import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const WeatherCardContainer = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#ffffff',
});

const WeatherContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden', // Убирает скроллинг, если контент выходит за рамки
});

const WeatherIcon = styled('img')({
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    marginLeft: 'auto',
});

const HourlyTemperatures = styled(Box)({
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '200px',
    overflowY: 'auto', // Добавляет вертикальный скролл при необходимости
});

interface HourlyTemperature {
    time: string; // Время в формате строки
    temp: number;
}

interface WeatherCardProps {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    icon: string;
    hourlyTemperatures: HourlyTemperature[];
}

// Функция для форматирования времени в 12-часовом формате
const formatTime = (time: string) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
        return 'Invalid time'; // Обработка случая с некорректным временем
    }
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' hour should be '12'
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, humidity, icon, hourlyTemperatures }) => {
    return (
        <WeatherCardContainer>
            <WeatherContent>
                <Typography variant="h4" component="div" gutterBottom>
                    {city}
                </Typography>
                <Typography variant="h6">
                    {Math.round(temperature)}°C
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Humidity: {humidity}%
                </Typography>
                <HourlyTemperatures>
                    <Typography variant="body2" color="text.primary" gutterBottom>
                        Hourly Temperatures:
                    </Typography>
                    {hourlyTemperatures.map((hour, index) => (
                        <Typography key={index} variant="body2">
                            {formatTime(hour.time)}: {Math.round(hour.temp)}°C
                        </Typography>
                    ))}
                </HourlyTemperatures>
            </WeatherContent>
            <WeatherIcon
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
        </WeatherCardContainer>
    );
};

export default WeatherCard;

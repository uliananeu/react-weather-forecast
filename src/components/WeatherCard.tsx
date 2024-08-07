import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
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
});

const WeatherContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
});

const WeatherIcon = styled('img')({
    width: '130px',
    height: '150px',
    objectFit: 'contain',
    marginLeft: 'auto', 
});

const WeatherButton = styled(Button)({
    backgroundColor: '#1976d2',
    color: '#ffffff',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#1565c0',
    },
    width: '100%',
    marginTop: '20px',
});

interface WeatherCardProps {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, humidity, icon }) => {
    return (
        <WeatherCardContainer>
            <WeatherContent>
                <Typography variant="h5" component="div">
                    {city}
                </Typography>
                <Typography variant="h6">
                    {Math.round(temperature)}°C
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Humidity: {humidity}%
                </Typography>
            </WeatherContent>
            <WeatherIcon
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
        </WeatherCardContainer>
    );
};

export default WeatherCard;

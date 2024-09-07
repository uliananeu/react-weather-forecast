import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const WeatherCardContainer = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
    maxWidth: '350px', 
    margin: 'auto',
    padding: '10px',
    backgroundColor: '#ffffff',
    color: '#000000',
});

const WeatherContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
});

const WeatherIcon = styled('img')({
    width: '80px', 
    height: '80px',
    objectFit: 'contain',
    marginLeft: 'auto',
});

interface WeatherCardProps {
    temperature: number;
    description: string;
    humidity: number;
    icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temperature, description, humidity, icon }) => {
    return (
        <WeatherCardContainer>
            <WeatherContent>
                <Typography variant="h6" component="div">
                    Today
                </Typography>
                <Typography variant="h5">
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

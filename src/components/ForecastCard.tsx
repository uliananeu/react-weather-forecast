import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const ForecastCardContainer = styled(Card)({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '10px auto',
    padding: '10px',
    width: '90%',
    maxWidth: '400px',
});

const ForecastContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
});

const ForecastIcon = styled('img')({
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    marginLeft: 'auto',
    imageRendering: 'crisp-edges',
});

interface ForecastCardProps {
    day: string;
    temperature: number;
    description: string;
    icon: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day, temperature, description, icon }) => {
    return (
        <ForecastCardContainer>
            <ForecastContent>
                <Typography variant="h6" component="div">
                    {day}
                </Typography>
                <Typography variant="body1">
                    {Math.round(temperature)}°C
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </ForecastContent>
            <ForecastIcon
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
        </ForecastCardContainer>
    );
};

export default ForecastCard;

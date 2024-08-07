import axios from 'axios';

const API_KEY = '3b194bcc7ccb25ad9c230b9e6b9a1068';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeather = async (city: string) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
};

export const getForecast = async (city: string) => {
    const response = await axios.get(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
};

export const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

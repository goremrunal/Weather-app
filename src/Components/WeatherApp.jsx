import React, { useState } from 'react';
import './WeatherApp.css';
import Overview from './Overview';
import Graph from './Graph';
import MapContainer from './MapContainer';
import RainfallContainer from './RainfallContainer';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = '8fbd3b1571c73c718314a597b7502785'; // Replace with your API key

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Weather data not available');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderWeather = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!weatherData) {
      return <p>Failed to fetch weather data. Please try again later.</p>;
    }

    return <Overview weatherData={weatherData} />;
  };

  return (
    <div className="weather-app">
      <h1>Forest-Themed Weather App</h1>
      <div className="weather-search">
        <label>Enter city: </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      {renderWeather()}
      {forecastData && <Graph forecastData={forecastData} />}
      {forecastData && <RainfallContainer forecastData={forecastData} />}
      {forecastData && <MapContainer city={city} />}
    </div>
  );
};

export default Weather;

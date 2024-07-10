import React, { useState } from 'react';
import Weather from './Weather';
import Graph from './Graph';
import './Overview.css';
import './RainfallContainer';
import './Forecast'

const Overview = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = '8fbd3b1571c73c718314a597b7502785';

  const fetchWeatherData = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&appid=${apiKey}&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      if (!weatherResponse.ok) {
        throw new Error('Weather data not available');
      }

      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overview">
      <h1> Weather App</h1>
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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {weatherData && <Weather weatherData={weatherData} />}
          {forecastData && <Graph forecastData={forecastData} />}
        </>
      )}
    </div>
  );
};

export default Overview;

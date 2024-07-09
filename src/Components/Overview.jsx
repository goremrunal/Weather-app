import React, { useState } from 'react';
import Weather from './Weather';
import Graph from './Graph';
import './Overview.css';

const Overview = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = '8fbd3b1571c73c718314a597b7502785'; // Replace with your API key

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&appid=${apiKey}&units=metric`;

      const weatherResponse = await fetch(weatherUrl);
      const forecastResponse = await fetch(forecastUrl);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Data not available');
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

  return (
    <div className="overview">
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Weather weatherData={weatherData} />
          <Graph forecastData={forecastData} />
        </>
      )}
    </div>
  );
};

export default Overview;

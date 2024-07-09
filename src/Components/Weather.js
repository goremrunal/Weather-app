import React, { useState } from 'react';
import './Weather.css';

const Weather = ({ weatherData }) => {
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.weather[0]) {
    return <div className="weather">Loading...</div>;
  }

  const { main, weather } = weatherData;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const getTemperature = () => {
    if (units === 'metric') {
      return `${temp}°C`;
    } else {
      // Convert Celsius to Fahrenheit
      const tempF = (temp * 9/5) + 32;
      return `${tempF.toFixed(1)}°F`;
    }
  };

  return (
    <div className="weather">
      <h2>Current Weather</h2>
      <p>Temperature: {getTemperature()}</p>
      <p>Humidity: {humidity}%</p>
      <p>Description: {description}</p>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
      <button onClick={toggleUnits}>Toggle Units</button>
    </div>
  );
};

export default Weather;

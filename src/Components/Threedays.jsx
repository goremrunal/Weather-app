import React, { useState, useEffect } from 'react';

const WeatherForecastComponent = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = 'your_weather_api_key'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const data = await response.json();
        setForecastData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setError('Failed to fetch forecast data. Please try again later.');
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [city]); // Fetch forecast data when city prop changes

  if (loading) {
    return <p>Loading forecast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecastData) {
    return null;
  }

  // Extract next 3 days' forecast data
  const today = new Date().getDate();
  const nextDaysForecast = forecastData.list.filter(item => {
    const forecastDate = new Date(item.dt * 1000).getDate();
    return forecastDate !== today; // Exclude today's forecast
  }).slice(0, 3); // Limit to next 3 days

  return (
    <div className="forecast-container">
      <h2>Weather Forecast for {city}</h2>
      <div className="forecast-grid">
        {nextDaysForecast.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-date">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p className="forecast-temp">Temp: {forecast.main.temp}°C</p>
            <p className="forecast-description">{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastComponent;

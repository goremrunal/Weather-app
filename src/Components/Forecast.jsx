import React from 'react';
import './Forecast.css'; // Correct import syntax for CSS files in React


const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      <h2>10-day Forecast</h2>
      {forecastData && forecastData.list ? (
        <div>
          {forecastData.list.map((day, index) => (
            <div key={index}>
              <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {day.temp ? day.temp.day : 'N/A'}°C</p>
              <p>Description: {day.weather ? day.weather[0].description : 'N/A'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Forecast;

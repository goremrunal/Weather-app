import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './RainfallContainer.css';

const RainfallContainer = ({ city }) => {
  const [rainfallData, setRainfallData] = useState(null);

  useEffect(() => {
    const fetchRainfallData = async () => {
      const apiKey = '8fbd3b1571c73c718314a597b7502785';
      const rainfallUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(rainfallUrl);
        const data = await response.json();
        
        if (data && data.list) {
          const dates = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
          const rainfalls = data.list.map(item => item.rain ? item.rain['3h'] : 0);
  
          setRainfallData({
            labels: dates,
            datasets: [{
              label: 'Rainfall (mm)',
              data: rainfalls,
              fill: false,
              borderColor: 'blue'
            }]
          });
        } else {
          console.error('No data or data.list found in API response:', data);
        }
      } catch (error) {
        console.error('Error fetching rainfall data:', error);
      }
    };

    if (city) {
      fetchRainfallData();
    }
  }, [city]);

  return (
    <div className="rainfall-container">
      <h2>Rainfall Data</h2>
      {rainfallData ? <Line data={rainfallData} /> : <div>Loading...</div>}
    </div>
  );
};

export default RainfallContainer;

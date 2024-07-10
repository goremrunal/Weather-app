import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ city }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityCoords = async () => {
      const apiKey = '8fbd3b1571c73c718314a597b7502785';
      const url = `https://api.opencage.com/geocode/v1/json?q=${city}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch city coordinates');
        }
        const data = await response.json();
        const { lat, lng } = data.results[0].geometry;
        setLat(lat);
        setLng(lng);
      } catch (error) {
        console.error('Error fetching city coordinates:', error);
        setError('Failed to fetch city coordinates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCityCoords();
  }, [city]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="map-container">
      {lat !== 0 && lng !== 0 && (
        <MapContainer center={[lat, lng]} zoom={12} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]}>
            <div className="marker-label">{city}</div>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;

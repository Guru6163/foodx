import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

function GoogleMaps() {
  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 16px)',
  };

  const center = {
    lat: 12.6766, // Latitude of Arani, Tamil Nadu, India
    lng: 79.2862, // Longitude of Arani, Tamil Nadu, India
  };

  const markerPosition = {
    lat: 0.1166, // Latitude of the marker position
    lng: 0.0862, // Longitude of the marker position
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14} // Initial zoom level
      apiKey="AIzaSyD6FerEjOO5J9UUPEj54MM7b7yKJlXOL18" // Replace with your actual API key
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
}

export default GoogleMaps;

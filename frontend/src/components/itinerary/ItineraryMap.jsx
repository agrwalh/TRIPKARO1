import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for marker icons not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Define a custom icon for the selected destination (e.g., red color)
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon that corresponds to the marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // Size of the shadow
});

// Component to dynamically change the map view based on selected destination
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const ItineraryMap = ({ destinations, destination, finaldestination }) => {
  // Find the selected destination's coordinates, or use the default center

  const selectedDestination = destinations.find(dest => dest.name === destination);
  const center = selectedDestination ? selectedDestination.location : { lat: 20.5937, lng: 78.9629 }; // Default center to India
  const zoom = selectedDestination ? 10 : 5; // Zoom in when a destination is selected

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Change map view when destination is selected */}
      <ChangeView center={center} zoom={zoom} />

      

      {destinations.map((dest, index) => (
        <Marker
          key={index}
          position={dest.location}
          icon={dest.name === finaldestination ? customIcon : new L.Icon.Default()} // Use the custom icon for the matched destination
        >
          <Popup>{dest.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ItineraryMap;

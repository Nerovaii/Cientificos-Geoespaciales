import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/App.css';
import { Globe2 } from 'lucide-react'

const MapView = () => {
    return (
        <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <Globe2 className="app-icon" />
          Cientificos Geoespaciales
        </h1>
      </header>
      <main className="app-main">
        <div className="map-container">
          <MapContainer
            center={[-35.759673, -71.621172]}
            zoom={10}
            className="leaflet-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </main>
    </div>
    );
};

export default MapView;

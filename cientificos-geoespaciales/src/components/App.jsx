import React, { useState } from 'react';
import LayerMenu from './Layer';
import MapComponent from './Map';
import '../styles/App.css';
import logo from '../assets/logo.png';

function App() {
  const [visibleLayers, setVisibleLayers] = useState({});
  const [layerData, setLayerData] = useState({}); // Estado para los datos de las capas subidas

  const toggleLayer = (layerName) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  const addLayer = (layerName, data) => {
    // Función para agregar la capa subida al estado de la aplicación
    setLayerData(prev => ({
      ...prev,
      [layerName]: data
    }));
    setVisibleLayers(prev => ({
      ...prev,
      [layerName]: true // Hacer visible la capa por defecto
    }));
  };

  return (
    <div className="map-view">
      <header>
        <h1>
          <img 
            src={logo} 
            alt="Logo" 
            className="logo"
          />        
          Cientificos Geoespaciales
        </h1>
      </header>
      <main>
        <div className="map-content">
          <LayerMenu 
            visibleLayers={visibleLayers} 
            toggleLayer={toggleLayer} 
            addLayer={addLayer}
          />
          <div className="map-wrapper">
            <MapComponent 
              visibleLayers={visibleLayers} 
              layerData={layerData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import "../styles/Landing.css";
import LayerMenu from './Layer'; // Asegúrate de que la ruta sea correcta
import MapComponent from './Map'; // Asegúrate de que la ruta sea correcta
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

function Landing() {
  // Estado para las capas visibles
  const [visibleLayers, setVisibleLayers] = useState({});
  const [layerData, setLayerData] = useState([]); // Suponiendo que tengas datos de capa que quieras pasar

  // Función para alternar la visibilidad de una capa
  const toggleLayer = (layerName) => {
    setVisibleLayers((prevLayers) => ({
      ...prevLayers,
      [layerName]: !prevLayers[layerName],
    }));
  };

  // Función para agregar una nueva capa
  const addLayer = (layerName, data) => {
    setVisibleLayers((prevLayers) => ({
      ...prevLayers,
      [layerName]: true, // Añadir capa como visible por defecto
    }));
    setLayerData((prevData) => [...prevData, data]); // Agregar datos de la capa al estado
    console.log(`Capa añadida: ${layerName}`, data); // Aquí podrías procesar el `data` si es necesario
  };

  // Función para manejar el logout de Google
  function handleLogout() {
    googleLogout();
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }

  return (
    <div className="map-view">
      <header>
        <h1>
          <img src={logo} alt="Logo" className="logo" />
          SpeculApp
        </h1>
        <div className='logout-button'>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>
      <main>
        <div className="map-content">
          {/* Renderizar el menú de capas */}
          <LayerMenu 
            visibleLayers={visibleLayers} 
            toggleLayer={toggleLayer} 
            addLayer={addLayer} 
          />
          <div className="map-wrapper">
            {/* Renderizar el componente de mapa y pasarle las capas visibles */}
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

export default Landing;

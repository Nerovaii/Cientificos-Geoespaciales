import React, { useState } from 'react';
import LayerMenu from './Layer';
import MapComponent from './Map';
import '../styles/App.css';
import logo from '../assets/logo.png';

function App() {
    // Estado para las capas visibles
    const [visibleLayers, setVisibleLayers] = useState({});
    // Estado para los datos de las capas subidas
    const [layerData, setLayerData] = useState({});

    // Función para alternar la visibilidad de una capa
    const toggleLayer = (layerName) => {
        setVisibleLayers(prev => ({
            ...prev,
            [layerName]: !prev[layerName]
        }));
    };

    // Función para agregar la capa subida al estado de la aplicación
    const addLayer = (layerName, data) => {
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

import React from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

function Map({ layerData, visibleLayers }) { // Recibe layerData y visibleLayers como props

    // Función para establecer el estilo de los elementos GeoJSON
    const setColor = () => {
      return { weight: 1 };
    };
  
    // Función para crear un icono personalizado para los marcadores
    const customMarkerIcon = (name) =>
      divIcon({
        html: name,
        className: 'icon',
      });
  
    // Función para establecer el icono de los puntos en el GeoJSON
    const setIcon = (feature, latlng) => {
      return L.marker(latlng, { icon: customMarkerIcon(feature.properties.Name) });
    };
  
    return (
      <MapContainer
        center={[-35.759673, -71.621172]} // Coordenadas iniciales del mapa
        zoom={10} // Nivel de zoom inicial
        className="map-container" // Clase CSS para el contenedor del mapa
      >
        <LayersControl position="topright"> {/* Control de capas en la esquina superior derecha */}
          <LayersControl.BaseLayer checked name="OpenStreetMap"> {/* Capa base de OpenStreetMap */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              //url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </LayersControl.BaseLayer>
          {Object.entries(visibleLayers).map(
            ([layerName, isVisible]) =>
              isVisible && layerData[layerName] ? ( // Verifica si la capa es visible y si hay datos para esa capa
                <GeoJSON
                  key={layerName}
                  data={layerData[layerName]} // Datos GeoJSON para la capa
                  style={setColor} // Estilo para la capa GeoJSON
                  pointToLayer={setIcon} // Función para establecer iconos en puntos
                />
              ) : null
          )}
        </LayersControl>
      </MapContainer>
    );
}

export default Map;

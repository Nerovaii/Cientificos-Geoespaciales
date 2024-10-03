import React from 'react';
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

function Map({ layerData, visibleLayers }) { // Change geojsonData to layerData

    const setColor = () => {
      return { weight: 1 };
    };
  
    const customMarkerIcon = (name) =>
      divIcon({
        html: name,
        className: 'icon',
      });
  
    const setIcon = (feature, latlng) => {
      return L.marker(latlng, { icon: customMarkerIcon(feature.properties.Name) });
    };
  
    return (
      <MapContainer
        center={[-35.759673, -71.621172]}
        zoom={10}
        className="map-container"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </LayersControl.BaseLayer>
          {Object.entries(visibleLayers).map(
            ([layerName, isVisible]) =>
              isVisible && layerData[layerName] ? ( // Use layerData here
                <GeoJSON
                  key={layerName}
                  data={layerData[layerName]} // Use layerData here
                  style={setColor}
                  pointToLayer={setIcon}
                />
              ) : null
          )}
        </LayersControl>
      </MapContainer>
    );
}

export default Map;

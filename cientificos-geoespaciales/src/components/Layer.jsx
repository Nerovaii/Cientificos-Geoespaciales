import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import GeoTIFF from 'geotiff';
import '../styles/Layer.css';

function LayerMenu({ visibleLayers, toggleLayer, addLayer }) {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        let parsedData;
        try {
          if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
            parsedData = JSON.parse(fileContent);
          } else if (file.name.endsWith('.csv')) {
            parsedData = csvToGeoJSON(fileContent); 
          } else {
            throw new Error('Unsupported file format');
          }

          addLayer(file.name, parsedData);
          toggleLayer(file.name); 
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="layer-menu">
      <h2>Capas</h2>
      <ul>
        {Object.entries(visibleLayers).map(([layerName, isVisible]) => (
          <li key={layerName}>
            <label>
              <input
                type="checkbox"
                checked={visibleLayers[layerName] || false}
                onChange={() => toggleLayer(layerName)}
              />
              <span>{layerName}</span>
            </label>
          </li>
        ))}
      </ul>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Arrastra o sube archivos haciendo click</p>
      </div>
    </div>
  );
}

export default LayerMenu;

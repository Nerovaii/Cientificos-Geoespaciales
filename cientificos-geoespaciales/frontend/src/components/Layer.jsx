import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/Layer.css';

// Componente LayerMenu que maneja la visualización y carga de capas
function LayerMenu({ visibleLayers, toggleLayer, addLayer }) {
    const [isVisible, setIsVisible] = useState(true);

    // Función que se ejecuta cuando se sueltan archivos en la zona de drop
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = async (event) => {
                const fileContent = event.target.result;

                try {
                    const parsedData = parseFileContent(file, fileContent);
                    // Añadir la capa y alternar su visibilidad
                    addLayer(file.name, parsedData);
                    toggleLayer(file.name); 
                } catch (error) {
                    console.error('Error parsing file:', error);
                }
            };

            reader.readAsText(file);
        });
    }, [addLayer, toggleLayer]);

    // Función para parsear el contenido del archivo según su formato
    const parseFileContent = (file, fileContent) => {
        if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
            return JSON.parse(fileContent);
        } else if (file.name.endsWith('.csv')) {
            return csvToGeoJSON(fileContent); 
        } else {
            throw new Error('Unsupported file format');
        }
    };

    // Obtener propiedades de Dropzone
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // Función para alternar la visibilidad del menú de capas
    const toggleMenuVisibility = () => setIsVisible(prev => !prev);

    return (
        <div className={`layer-menu-container ${isVisible ? '' : 'hidden'}`} style={{ position: 'absolute', zIndex: 999 }}>
            <button onClick={toggleMenuVisibility}>
                {isVisible ? '<' : '>'}
            </button>
            {isVisible && (
                <div className="layer-menu">
                    <h2>Capas</h2>
                    <ul>
                        {Object.entries(visibleLayers).map(([layerName, isVisible]) => (
                            <li key={layerName}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isVisible || false}
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
            )}
        </div>
    );
}

export default LayerMenu;

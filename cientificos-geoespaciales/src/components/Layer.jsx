import React from 'react';
import { Layers } from 'lucide-react';
import './LayerMenu.css';

function LayerMenu({ visibleLayers, toggleLayer }) {
  return (
    <div className="layer-menu">
      <h2>
        <Layers />
        Capas
      </h2>
      <ul>
        {Object.entries(visibleLayers).map(([layerName, isVisible]) => (
          <li key={layerName}>
            <label>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => toggleLayer(layerName)}
              />
              <span>{layerName}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LayerMenu;
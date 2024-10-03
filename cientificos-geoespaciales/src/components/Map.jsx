'use client'

import React, { useState } from 'react'
import { Globe2 } from 'lucide-react'
import { LayerMenu } from './layer-menu'
import { MapComponent } from './map-component'
import './map-view.css'

export default function MapView() {
  const [visibleLayers, setVisibleLayers] = useState({
    base: true,
    layer1: false,
    layer2: false,
  })

  const toggleLayer = (layerName: string) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }))
  }

  return (
    <div className="map-view">
      <header>
        <h1>
          <Globe2 />
          Cientificos Geoespaciales
        </h1>
      </header>
      <main>
        <div className="map-content">
          <LayerMenu visibleLayers={visibleLayers} toggleLayer={toggleLayer} />
          <div className="map-wrapper">
            <MapComponent visibleLayers={visibleLayers} />
          </div>
        </div>
      </main>
    </div>
  )
}
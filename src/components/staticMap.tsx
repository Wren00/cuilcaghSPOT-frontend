import * as React from 'react';
import Map from 'react-map-gl';

export function StaticMap() {

  return (
    
    <Map
      initialViewState={{
        longitude: -7.815915,
        latitude: 54.22,
        zoom: 12
      }}
      style={{ height: 600 }}
      mapboxAccessToken = "pk.eyJ1Ijoid3JlbjAwIiwiYSI6ImNsNmUydXdxZjAzbGwzaW8zbmJ1Yms4bjcifQ.yZC1cDiSlXC-8JfEIe-URg"
      mapStyle="mapbox://styles/mapbox/outdoors-v9"
      minZoom={11}
    />
  );
}
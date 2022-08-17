import mapboxgl from 'mapbox-gl';
import * as React from 'react';
import ReactMapboxGL, { Source, Layer } from "react-map-gl";

export function ReactMap() {

  const southWest = new mapboxgl.LngLat(-7.8636, 54.2049);
  const northEast = new mapboxgl.LngLat(-7.73007, 54.2595);
  const boundingBox = new mapboxgl.LngLatBounds(southWest, northEast);

    const geoData = 'http://myjson.dit.upm.es/api/bins/3brg';
    console.log(geoData);


  return (
    <ReactMapboxGL
      initialViewState={{
        longitude: -7.815915,
        latitude: 54.22,
        zoom: 12,
        bounds: boundingBox
      }}
      style={{ height: 600 }}
      mapboxAccessToken = "pk.eyJ1Ijoid3JlbjAwIiwiYSI6ImNsNmUydXdxZjAzbGwzaW8zbmJ1Yms4bjcifQ.yZC1cDiSlXC-8JfEIe-URg"
      mapStyle="mapbox://styles/mapbox/outdoors-v9"
      minZoom={11}
      >
        <Source
            id="geojson"
            type="geojson"
            data={geoData}
        />
        <Layer
            id="marker"
            type="fill"
            source="geoData"
            paint={{ "fill-color": "#228b22", "fill-opacity": 0.4 }}
        />
    </ReactMapboxGL>
  );
}




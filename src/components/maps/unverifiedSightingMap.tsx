import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGL, { Marker } from "react-map-gl";
import { UnverifiedSighting } from "../../types/sightings.types";

interface ReactMapProps {
  sightingCoordinates: UnverifiedSighting;
}

const UnverifiedSightingMap: React.FC<ReactMapProps> = ({
  sightingCoordinates,
}) => {
  return (
    <ReactMapboxGL
      initialViewState={{
        longitude: -7.815915,
        latitude: 54.23,
        zoom: 11,
      }}
      style={{ height: 600 }}
      mapboxAccessToken="pk.eyJ1Ijoid3JlbjAwIiwiYSI6ImNsNmUydXdxZjAzbGwzaW8zbmJ1Yms4bjcifQ.yZC1cDiSlXC-8JfEIe-URg"
      mapStyle="mapbox://styles/mapbox/outdoors-v9"
      attributionControl={false}
    >
      <Marker
        longitude={sightingCoordinates.long}
        latitude={sightingCoordinates.lat}
        anchor="top"
        color="#F97491"
      ></Marker>
    </ReactMapboxGL>
  );
};

export { UnverifiedSightingMap };

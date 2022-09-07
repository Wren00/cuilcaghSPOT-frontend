import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGL, { Marker } from "react-map-gl";
import { ConfirmedSighting } from "../../types/confirmedSighting.types";

interface ReactMapProps {
  confirmedSightingCoordinates: ConfirmedSighting;
}

const ConfirmedSightingMap: React.FC<ReactMapProps> = ({
  confirmedSightingCoordinates,
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
        longitude={confirmedSightingCoordinates.long}
        latitude={confirmedSightingCoordinates.lat}
        anchor="top"
        color="#86E9CB"
      ></Marker>
    </ReactMapboxGL>
  );
};

export { ConfirmedSightingMap };

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import { UnverifiedSighting } from "../../types/sightings.types";
import { ConfirmedSighting } from "../../types/confirmedSighting.types";

interface ReactMapProps {
  sightingCoordinates: UnverifiedSighting[];
  confirmedSightingCoordinates: ConfirmedSighting[];
}

const ReactMap: React.FC<ReactMapProps> = ({
  sightingCoordinates,
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
      {sightingCoordinates.map((sighting, index) => (
        <Marker
          longitude={sighting.long}
          latitude={sighting.lat}
          anchor="top"
          color="#F97491"
        ></Marker>
      ))}
      {confirmedSightingCoordinates.map((sighting, index) => (
        <Marker
          longitude={sighting.long}
          latitude={sighting.lat}
          anchor="top"
          color="#86E9CB"
        ></Marker>
      ))}
    </ReactMapboxGL>
  );
};

export { ReactMap };

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGL from "react-map-gl";

const InteractiveReactMap = () => {
  return (
    <ReactMapboxGL
      initialViewState={{
        longitude: -7.815915,
        latitude: 54.22,
        zoom: 12,
      }}
      style={{ height: 600 }}
      mapboxAccessToken="pk.eyJ1Ijoid3JlbjAwIiwiYSI6ImNsNmUydXdxZjAzbGwzaW8zbmJ1Yms4bjcifQ.yZC1cDiSlXC-8JfEIe-URg"
      mapStyle="mapbox://styles/mapbox/outdoors-v9"
      attributionControl={false}
    ></ReactMapboxGL>
  );
};

export { InteractiveReactMap };

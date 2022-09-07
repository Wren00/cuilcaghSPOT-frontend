import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGL, { Marker } from "react-map-gl";
import { Dispatch, SetStateAction } from "react";

interface ILngLat {
  lng: number;
  lat: number;
}

interface MapProps {
  long: number;
  lat: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLong: Dispatch<SetStateAction<number>>;
}

interface ReturnType {
  lngLat: ILngLat;
}

const InteractiveReactMap: React.FC<MapProps> = ({
  lat,
  long,
  setLat,
  setLong,
}) => {
  const handleMapClick = (e: ReturnType) => {
    const { lng: longitude, lat: latitude } = e.lngLat;

    setLat(latitude);
    setLong(longitude);

    console.log(latitude);
    console.log(longitude);
  };

  return (
    <ReactMapboxGL
      initialViewState={{
        longitude: -7.815915,
        latitude: 54.22,
        zoom: 12,
      }}
      style={{ height: 600 }}
      onClick={handleMapClick}
      mapboxAccessToken="pk.eyJ1Ijoid3JlbjAwIiwiYSI6ImNsNmUydXdxZjAzbGwzaW8zbmJ1Yms4bjcifQ.yZC1cDiSlXC-8JfEIe-URg"
      mapStyle="mapbox://styles/mapbox/outdoors-v9"
      attributionControl={false}
    >
      <Marker
        longitude={long}
        latitude={lat}
        anchor="top"
        color="#86E9CB"
      ></Marker>
    </ReactMapboxGL>
  );
};

export { InteractiveReactMap };

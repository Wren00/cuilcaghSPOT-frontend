import "./css/sightings.css";
import { ReactMap } from "../components/maps/map";
import { SightingList } from "../components/sightingList";
import { Link } from "react-router-dom";
import { ConfirmedSightingList } from "../components/confirmedSightingList";
import { UnverifiedSighting } from "../types/sightings.types";
import { useEffect, useState } from "react";
import { ConfirmedSighting } from "../types/confirmedSighting.types";
import * as React from "react";
import Auth from "../components/authorisation/context";
import { ApiClient } from "../utils";

const Sightings = () => {
  const context = React.useContext(Auth.AuthContext);
  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);
  const [confirmedSightings, setConfirmedSightings] = useState<
    ConfirmedSighting[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `unverifiedsightings/getAllUnverifiedSightings`
      );
      console.log(response);
      setSightings(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `confirmedsightings/getAllConfirmedSightings`
      );
      console.log(response);
      setConfirmedSightings(response);
    };
    fetchData();
  }, []);

  return (
    <div className="sightingpage">
      <h1 className="sightingtitle">Wildlife Sightings</h1>
      <div className="sightingsmap">
        <ReactMap
          sightingCoordinates={sightings}
          confirmedSightingCoordinates={confirmedSightings}
        />
      </div>
      <div>
        {context?.userSession && context.userSession.accessToken ? (
          <button className="submit-sighting-btn">
            <Link className="btn-link" to="./submitSightingData">
              Submit a sighting?
            </Link>
          </button>
        ) : (
          <button className="submit-sighting-btn">
            <Link className="btn-link" to="../register">
              Register to submit a sighting
            </Link>
          </button>
        )}
      </div>
      <div className="featuredsighting">
        <SightingList />
        <Link to="./allUnverifiedSightings">See all unverified sightings.</Link>
      </div>
      <div className="featuredconfirmedsighting">
        <ConfirmedSightingList />
      </div>
      <Link to="./allConfirmedSightings">See all confirmed sightings.</Link>
    </div>
  );
};

export default Sightings;

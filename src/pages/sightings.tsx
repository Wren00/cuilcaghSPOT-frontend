import "./css/sightings.css";
import { ReactMap } from "../components/map";
import { SightingList } from "../components/sightingList";
import { Link } from "react-router-dom";
import { ConfirmedSightingList } from "../components/confirmedSightingList";
import { UnverifiedSighting } from "../types/sightings.types";
import { useEffect, useState } from "react";
import axios from "axios";
import { ConfirmedSighting } from "../types/confirmedSighting.types";

const Sightings = () => {
  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);
  const [confirmedSightings, setConfirmedSightings] = useState<
    ConfirmedSighting[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/unverifiedsightings/getAllUnverifiedSightings`
      );
      console.log(response);
      setSightings(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/confirmedsightings/getAllConfirmedSightings`
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
        <button className="submit-sighting-btn">
          <Link className="btn-link" to="./submitSightingData">
            Submit a sighting?
          </Link>
        </button>
      </div>
      <div className="featuredsighting">
        <SightingList />
      </div>
      <div className="featuredconfirmedsighting">
        <ConfirmedSightingList />
      </div>
    </div>
  );
};

export default Sightings;

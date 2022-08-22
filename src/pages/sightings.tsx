import "./css/sightings.css";
import { ReactMap } from "../components/map";
import { SightingList } from "../components/sightingList";
import { Link } from "react-router-dom";
import { ConfirmedSightingList } from "../components/confirmedSightingList";

const Sightings = () => (
  <div className="sightingpage">
    <h1 className="sightingtitle">Wildlife Sightings</h1>
    <div className="sightingsmap">
      <ReactMap />
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

export default Sightings;

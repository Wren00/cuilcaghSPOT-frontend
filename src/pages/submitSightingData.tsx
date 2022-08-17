import { ReactMap } from "../components/map";
import { PostSighting } from "../components/postSighting";
import "./css/sightings.css";

const SightingDataForm = () => (
  <div className="sightingpage">
    <h1 className="sightingtitle">Submit Data</h1>
    <div className="dataform">
      Add sighting data
      <div className="sightingsmap">
        <ReactMap />
      </div>
      <PostSighting />
    </div>
  </div>
);

export default SightingDataForm;

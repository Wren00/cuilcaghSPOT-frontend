import { PostSighting } from "../components/postSighting";
import "./css/unverified-sightings.css";

const SightingDataForm = () => (
  <div className="sighting-page">
    Make a Sighting!
    <div className="dataform">
      <PostSighting />
    </div>
  </div>
);

export default SightingDataForm;

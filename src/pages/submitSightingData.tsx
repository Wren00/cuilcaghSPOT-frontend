import { PostSighting } from "../components/postSighting";
import "./css/unverified-sightings.css";

const SightingDataForm = () => (
  <div className="sightingpage">
    <div className="dataform">
      <PostSighting />
    </div>
  </div>
);

export default SightingDataForm;

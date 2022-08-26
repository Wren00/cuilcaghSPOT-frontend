import { PostSighting } from "../components/postSighting";
import "./css/unverified-sightings.css";

const SightingDataForm = () => (
  <div className="sightingpage">
    <h1 className="sightingtitle">What did you see?</h1>
    <div className="dataform">
      <PostSighting />
    </div>
  </div>
);

export default SightingDataForm;

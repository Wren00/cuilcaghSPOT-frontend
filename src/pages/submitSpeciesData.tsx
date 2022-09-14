import { PostSpecies } from "../components/postSpecies";

const SpeciesDataForm = () => (
  <div className="sightingpage">
    <h1 className="sightingtitle">Submit Data</h1>
    <div className="dataform">
      Add species data
      <PostSpecies />
    </div>
  </div>
);

export default SpeciesDataForm;

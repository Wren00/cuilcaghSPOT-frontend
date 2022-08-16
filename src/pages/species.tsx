import { SpeciesList } from "../components/speciesList";
import './css/species.css';



const Species = () => (
  <div className='species'>
    <h1 className="title">Species List</h1>
    <br />
    <SpeciesList />
    <br />
  </div>
);

export default Species;

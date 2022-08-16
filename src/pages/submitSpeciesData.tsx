import { ReactMap } from '../components/map';
import { PostSpecies }  from '../components/postSpecies';
import { SightingList } from '../components/sightingList';


const SpeciesDataForm = () => (
  <div className='sightingpage'>
    <h1 className='sightingtitle'>Submit Data</h1>
    <div className='dataform'>
        Add species data
        <PostSpecies />
    </div>
  </div>
);

export default SpeciesDataForm;

import { ReactMap } from '../components/map';
import { PostSighting } from '../components/postSighting';


const SightingDataForm = () => (
  <div className='sightingpage'>
    <h1 className='sightingtitle'>Submit Data</h1>
    <div className='dataform'>
        Add species data
        <PostSighting />
    </div>
  </div>
);

export default SightingDataForm;
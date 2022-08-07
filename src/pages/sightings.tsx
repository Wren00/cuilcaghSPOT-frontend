import './css/sightings.css';
import {useEffect} from 'react';
import { ReactMap } from '../components/map';
import Container from '@mui/material/Container';


const Sightings  = () => (
  <div className='sightings'>
    <h1>Wildlife Sightings</h1>
    <br />
    <br />
    <ReactMap/>
  </div>
);

export default Sightings;

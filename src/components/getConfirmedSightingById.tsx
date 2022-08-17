import axios from "axios";
import '../pages/css/sightings.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ConfirmedSighting } from "../types/confirmedSighting.types";

const SightingById = () => {

  const [sighting, setSighting] = useState<ConfirmedSighting>();

  let { sightingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {

      const { data: response } = await axios.get(`http://localhost:5001/api/confirmedsightings/getSightingsById/` + sightingId);
      setSighting(response);
    }
    fetchData();
  }, []);
  
  return (
    sighting && (<div>
      <div key={`species-${sighting.sightingId}`}>
      <div className='largepicture'> <img src= {sighting.pictureUrl} alt=""/></div>
      <div className='date'> {sighting.date}</div>
        <div className='organismName'>{sighting.organismName}</div>
        <div className='userName'> {sighting.userName}</div>
        <div className='lat'>{sighting.lat}</div>
        <div className='long'>{sighting.long}</div>
      </div>
    </div>
    )
  )
}

export default SightingById;
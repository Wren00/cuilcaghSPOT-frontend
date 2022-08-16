import axios from "axios";
import { UnverifiedSighting } from "../types/sightings.types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Organism } from "../types/species.types";

const SpeciesById = () => {

  const [organism, setOrganism] = useState<Organism>();

  let { organismId } = useParams();

  useEffect(() => {
    const fetchData = async () => {

      const { data: response } = await axios.get(`http://localhost:5001/api/organisms/getOrganismById/` + organismId);
      console.log(response);
      setOrganism(response);
    }
    fetchData();
  }, []);
  //IMG is now only displaying on this page if pictureUrl is spelled incorrectly (below) but this same code only 
  //works in the species list if pictureUrl is spelled correctly.
  return (
    organism && (<div>
      <div key={`species-${organism.taxonName}`}>
        <div className='taxonName'> {organism.taxonName}  </div>
        <div className='latinName'>{organism.latinName}</div>
        <div className='largepicture'> <img src= {organism.pictureUrl} alt=""/></div>
        <div className='description'>{organism.description}</div>
      </div>
      <p className='editprompt'>
      Would you like to add or edit data on this page?
        <Link to= "../submitSpeciesData"> Contact </Link>
      </p>
    </div>
    )
  )
}

export default SpeciesById;
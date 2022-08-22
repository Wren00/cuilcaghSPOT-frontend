import axios from "axios";
import "../pages/css/sightings.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UnverifiedSighting } from "../types/sightings.types";

const SightingById = () => {
  const [sighting, setSighting] = useState<UnverifiedSighting>();

  let { sightingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/unverifiedsightings/getSightingsById/` +
          sightingId
      );
      setSighting(response);
    };
    fetchData();
  }, []);

  return (
    sighting && (
      <div>
        <div key={`species-${sighting.sightingId}`}>
          <div className="largepicture">
            {" "}
            <img src={sighting.pictureUrl} alt="" />
          </div>
          <div className="date">
            {" "}
            {new Date(sighting.date).toLocaleDateString()}
          </div>
          <div className="organismName">{sighting.organismName}</div>
          <div className="userName"> {sighting.userName}</div>
          <div className="lat">{sighting.lat}</div>
          <div className="long">{sighting.long}</div>
          <div className="reactions">{sighting.userReactions}</div>
          <div className="votes">{sighting.userVotes}</div>
        </div>
        <p className="editprompt">
          Would you like to add or edit data on this page?
          <Link to="../submitSpeciesData"> Contact </Link>
        </p>
      </div>
    )
  );
};

export default SightingById;

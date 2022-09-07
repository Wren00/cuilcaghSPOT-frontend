import axios from "axios";
import "../pages/css/sightings.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnverifiedSighting } from "../types/sightings.types";
import { Button } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import { UnverifiedSightingMap } from "./maps/unverifiedSightingMap";

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

  const incrementVote = async () => {
    try {
      const { data: response } = await axios.put(
        `http://localhost:5001/api/unverifiedsightings/incrementUserVote/` +
          sightingId
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementVote = async () => {
    try {
      const { data: response } = await axios.put(
        `http://localhost:5001/api/unverifiedsightings/decrementUserVote/` +
          sightingId
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function refreshPage() {
    window.location = window.location;
  }

  return (
    sighting && (
      <div>
        <UnverifiedSightingMap sightingCoordinates={sighting} />
        <div key={`sighting-${sighting.sightingId}`}>
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
          <div className="votes">{sighting.userVotes}</div>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementVote();
              refreshPage();
            }}
          >
            <ArrowCircleUpOutlinedIcon />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              decrementVote();
              refreshPage();
            }}
          >
            <ArrowCircleDownOutlinedIcon />
          </Button>
        </div>
      </div>
    )
  );
};

export default SightingById;

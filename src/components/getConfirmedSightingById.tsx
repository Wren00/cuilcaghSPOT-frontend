import axios from "axios";
import "../pages/css/confirmed-sightings.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConfirmedSighting } from "../types/confirmedSighting.types";
import {
  ThumbUpRounded,
  FavoriteRounded,
  YardRounded,
  PetsRounded,
  SentimentVerySatisfiedRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { Reactions } from "../types/reactions.types";

const ConfirmedSightingById = () => {
  const [sighting, setSighting] = useState<ConfirmedSighting>();
  const [reactions, setReactions] = useState<Reactions>();

  let { sightingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/confirmedsightings/getConfirmedSightingById/` +
          sightingId
      );
      setSighting(response);
    };
    fetchData();
  }, []);

  const getReactionNames = async () => {
    try {
      const { data: response } = await axios.put(
        `http://localhost:5001/api/reactions/getAllReactions`
      );
      setReactions(response);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementUserReaction = async (
    sightingId: number,
    reactionId: number
  ) => {
    let data = JSON.stringify({
      sightingId: sightingId,
      reactionId: reactionId,
    });

    console.log(data);

    try {
      const { data: response } = await axios.put(
        `http://localhost:5001/api/reactions/incrementUserReaction`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.body.sightingId);
      console.log(response.body.reactionId);
    } catch (error) {
      console.log(error);
    }
  };

  const displayReactionCount = async (
    reactionId: number,
    sightingId: number
  ) => {
    let data = JSON.stringify({
      sightingId: sightingId,
      reactionId: reactionId,
    });

    console.log(data);

    try {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/reactions/getSightingReactionCountById/` +
          sightingId
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    sighting && (
      <div>
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
          <div className="lat">{sighting.lat}</div>
          <div className="long">{sighting.long}</div>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementUserReaction(sighting.sightingId, 1);
              refreshPage();
            }}
          >
            <ThumbUpRounded />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementUserReaction(sighting.sightingId, 2);
              refreshPage();
            }}
          >
            <FavoriteRounded />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementUserReaction(sighting.sightingId, 3);
              refreshPage();
            }}
          >
            <YardRounded />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementUserReaction(sighting.sightingId, 4);
              refreshPage();
            }}
          >
            <PetsRounded />
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              incrementUserReaction(sighting.sightingId, 5);
              refreshPage();
            }}
          >
            <SentimentVerySatisfiedRounded />
          </Button>
        </div>
      </div>
    )
  );
};

export default ConfirmedSightingById;

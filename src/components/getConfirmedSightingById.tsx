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
import { Button, Grid } from "@mui/material";
import { Reactions } from "../types/reactions.types";
import { ConfirmedSightingMap } from "./maps/confirmedSightingMap";
import { ApiClient } from "../utils";
import * as React from "react";
import Auth from "./authorisation/context";
import { User } from "../types/users.types";
import jwtDecode from "jwt-decode";

const ConfirmedSightingById = () => {
  const [sighting, setSighting] = useState<ConfirmedSighting>();
  const [reactions, setReactions] = useState<Reactions>();
  const [flag, setFlag] = React.useState(true);
  const context = React.useContext(Auth.AuthContext);

  const [user, setUser] = useState<User>();

  let userId: number = 0;
  let isAdmin: boolean = false;

  const token = context?.userSession.accessToken;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    userId = parseInt(decodedToken.userId);
  }

  let { sightingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `confirmedsightings/getConfirmedSightingById/${sightingId}`
      );
      setSighting(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `users/getUserById/${sightingId}`
      );
      setUser(response);
      console.log(user);
    };
    fetchData();
  }, []);

  if (user?.userLevelId === 3) {
    isAdmin = true;
  }

  const incrementUserReaction = async (
    sightingId: number,
    reactionId: number
  ) => {
    let data = JSON.stringify({
      sightingId: sightingId,
      reactionId: reactionId,
    });

    try {
      const { data: response } = await ApiClient.put(
        `reactions/incrementUserReaction`,
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

    try {
      const { data: response } = await ApiClient.get(
        `reactions/getSightingReactionCountById/${sightingId}`
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    sighting && (
      <div className="sightingIdPage">
        <Grid container className="sighting-main" spacing={2}>
          <Grid item className="map" xs={12} sm={6}>
            <div className="sightingIdMap">
              <ConfirmedSightingMap confirmedSightingCoordinates={sighting} />
            </div>
          </Grid>
          <Grid item className="info" xs={12} sm={6}>
            <div key={`sighting-${sighting.sightingId}`}>
              <div className="largeSightingPicture">
                {" "}
                <img src={sighting.pictureUrl} alt="" />
              </div>
              <div className="date">
                Date seen: {"    "}
                {new Date(sighting.date).toLocaleDateString()}
              </div>
              <div className="organismName">
                Species seen: {"    "}
                {sighting.organismName}
              </div>
              <div className="userName">
                {" "}
                Seen By: {"    "}
                {sighting.userName}
              </div>
              <div className="reactions">
                <Button
                  size="small"
                  color={flag ? "primary" : "secondary"}
                  onClick={() => {
                    handleClick();
                    incrementUserReaction(sighting.sightingId, 1);
                    refreshPage();
                  }}
                >
                  <ThumbUpRounded />
                </Button>
                <Button
                  size="small"
                  color={flag ? "primary" : "secondary"}
                  onClick={() => {
                    handleClick();
                    incrementUserReaction(sighting.sightingId, 2);
                    refreshPage();
                  }}
                >
                  <FavoriteRounded />
                </Button>
                <Button
                  size="small"
                  color={flag ? "primary" : "secondary"}
                  onClick={() => {
                    handleClick();
                    incrementUserReaction(sighting.sightingId, 3);
                    refreshPage();
                  }}
                >
                  <YardRounded />
                </Button>
                <Button
                  size="small"
                  color={flag ? "primary" : "secondary"}
                  onClick={() => {
                    handleClick();
                    incrementUserReaction(sighting.sightingId, 4);
                    refreshPage();
                  }}
                >
                  <PetsRounded />
                </Button>
                <Button
                  size="small"
                  color={flag ? "primary" : "secondary"}
                  onClick={() => {
                    handleClick();
                    incrementUserReaction(sighting.sightingId, 5);
                    refreshPage();
                  }}
                >
                  <SentimentVerySatisfiedRounded />
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <div>
          {context?.userSession &&
            context.userSession.accessToken &&
            isAdmin && <button>Delete Sighting</button>}
        </div>
      </div>
    )
  );
};

export default ConfirmedSightingById;

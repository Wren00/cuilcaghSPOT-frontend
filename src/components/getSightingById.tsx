import "../pages/css/sightings.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnverifiedSighting } from "../types/sightings.types";
import { Button, Grid } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import { UnverifiedSightingMap } from "./maps/unverifiedSightingMap";
import * as React from "react";
import Auth from "./authorisation/context";
import { ApiClient } from "../utils";
import { User } from "../types/users.types";
import jwtDecode from "jwt-decode";

const SightingById = () => {
  const context = React.useContext(Auth.AuthContext);
  const [sighting, setSighting] = useState<UnverifiedSighting>();
  const [user, setUser] = useState<User>();

  let { sightingId } = useParams();
  let isAdmin: boolean = false;

  let userId: number = 0;

  const token = context?.userSession.accessToken;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    userId = parseInt(decodedToken.userId);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `unverifiedsightings/getSightingsById/${sightingId}`
      );
      setSighting(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `users/getUserById/${userId}`
      );
      setUser(response);
      console.log(user);
    };
    fetchData();
  }, []);

  if (user?.userLevelId === 3) {
    isAdmin = true;
  }

  const incrementVote = async () => {
    try {
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/incrementUserVote/${sightingId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementVote = async () => {
    try {
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/decrementUserVote/${sightingId}`
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
      <div className="sightingIdPage">
        <Grid container className="sighting-main" spacing={2}>
          <Grid item className="map" xs={12} sm={6}>
            <div className="sightingIdMap">
              <UnverifiedSightingMap sightingCoordinates={sighting} />
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
              <div className="votes">{sighting.userVotes}</div>
              {context?.userSession && context.userSession.accessToken && (
                <div>
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
              )}
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

export default SightingById;

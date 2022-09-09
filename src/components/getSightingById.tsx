import "../pages/css/sightings.css";
import { useNavigate, useParams } from "react-router-dom";
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
import { ConfirmedSighting } from "../types/confirmedSighting.types";
import ConfirmedSightingPopup from "./popups/confirmedSightingPopup";

const SightingById = () => {
  const context = React.useContext(Auth.AuthContext);
  const [sighting, setSighting] = useState<UnverifiedSighting>();
  const [confirmedSightings, setConfirmedSightings] = useState<
    ConfirmedSighting[]
  >([]);
  const [user, setUser] = useState<User>();
  const [checkUserId, setCheckUserId] = useState<number>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  let { sightingId } = useParams();
  let intSightingId: number;

  if (sightingId) {
    intSightingId = parseInt(sightingId);
  }

  let isAdmin: boolean = false;

  let userId: number = 0;

  const token = context?.userSession.accessToken;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    userId = parseInt(decodedToken.userId);
  }

  const fetchUnverifiedSighting = async () => {
    const { data: response } = await ApiClient.get(
      `unverifiedsightings/getSightingsById/${sightingId}`
    );

    setSighting(response);
    setCheckUserId(response.userId);
  };

  useEffect(() => {
    try {
      fetchUnverifiedSighting();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("userId", checkUserId);
      const { data: response } = await ApiClient.get(
        `users/getUserById/${checkUserId}`
      );
      setUser(response);
      console.log(response);
    };
    if (checkUserId) {
      fetchData();
    }
  }, [checkUserId]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `confirmedsightings/getSightingsByUserId/${checkUserId}`
      );
      setConfirmedSightings(response);
    };
    if (checkUserId) {
      fetchData();
    }
  }, [checkUserId]);

  useEffect(() => {
    if (sighting && sighting.userVotes === null) {
      let checkSighting: UnverifiedSighting = {
        date: sighting.date,
        lat: sighting.lat,
        long: sighting.long,
        organismId: sighting.organismId,
        organismName: sighting.organismName,
        pictureUrl: sighting.pictureUrl,
        sightingId: sighting.sightingId,
        userId: sighting.userId,
        userName: sighting.userName,
        userVotes: 0,
      };
      setSighting(checkSighting);
    }
  }, [sighting]);

  if (user?.userLevelId === 3) {
    isAdmin = true;
  }

  const createConfirmedSighting = async (
    verifiedSighting: ConfirmedSighting
  ) => {
    const addSighting = await ApiClient.post(
      `confirmedsightings/createConfirmedSighting`,
      verifiedSighting,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        removeSighting();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const removeSighting = async () => {
    if (sighting?.sightingId) {
      const sightingIdNum = sighting.sightingId;
      const deleteSighting = await ApiClient.delete(
        `unverifiedsightings/deleteUnverifiedSightingById`,
        { data: { sightingId: sightingIdNum } }
      )
        .then((response) => {})
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  const IncrementVote = async (sightingId: number) => {
    let verifiedSighting: ConfirmedSighting;

    try {
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/incrementUserVote/${intSightingId}`
      );
      fetchUnverifiedSighting();

      if (sighting && sighting.userVotes >= 5) {
        console.log("reaching");
        verifiedSighting = {
          sightingId: sighting.sightingId,
          organismId: sighting.organismId,
          userId: sighting.userId,
          pictureUrl: sighting.pictureUrl,
          date: sighting.date,
          lat: sighting.lat,
          long: sighting.long,
          organismName: sighting.organismName,
          userName: sighting.userName,
        };
        setStatus(
          "Sighting is now confirmed with more than 5 upvotes! You are being redirected back to the sightings page!"
        );
        setOpen(true);
        createConfirmedSighting(verifiedSighting);
        await setTimeout(() => {
          console.log("Navigating to /");
          navigate("/Sightings");
        }, 2000);
      }
      //Setting to 4 as index is 0
      if (confirmedSightings.length >= 4) {
        const trustedUser = {
          userId: userId,
          trustedUser: true,
        };

        const makeTrustedUser = await ApiClient.put(
          `users/updateUserDetails`,
          trustedUser,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decrementVote = async () => {
    try {
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/decrementUserVote/${sightingId}`
      );
      fetchUnverifiedSighting();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
                      IncrementVote(intSightingId);
                    }}
                  >
                    <ArrowCircleUpOutlinedIcon />
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      decrementVote();
                    }}
                  >
                    <ArrowCircleDownOutlinedIcon />
                  </Button>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <ConfirmedSightingPopup
          message={status}
          open={open}
          setOpen={setOpen}
        />
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

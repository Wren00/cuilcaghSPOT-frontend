import "../pages/css/species.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnverifiedSighting } from "../types/sightings.types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import {
  Button,
  CardActionArea,
  CardActions,
  Divider,
  Stack,
} from "@mui/material";
import * as React from "react";
import Auth from "./authorisation/context";
import { ApiClient } from "../utils";
import { ConfirmedSighting } from "../types/confirmedSighting.types";

export const SightingList = () => {
  const context = React.useContext(Auth.AuthContext);
  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);
  const [confirmedSightings, setConfirmedSightings] = useState<
    ConfirmedSighting[]
  >([]);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `unverifiedsightings/getAllUnverifiedSightings`
      );
      console.log(response);
      setSightings(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `confirmedsightings/getSightingsByUserId/${userId}`
      );
      console.log(response);
      setConfirmedSightings(response);
    };
    fetchData();
  }, []);

  const IncrementVote = async (sightingId: number) => {
    let checkSighting;
    let verifiedSighting;
    const [confirmedSightings, setConfirmedSightings] = useState<
      ConfirmedSighting[]
    >([]);

    try {
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/incrementUserVote/${sightingId}`
      );
      checkSighting = response;
      console.log(checkSighting);

      if (checkSighting.user_votes >= 5) {
        console.log("reaching");
        verifiedSighting = {
          sightingId: checkSighting.id,
          organismId: checkSighting.organism_id,
          userId: checkSighting.user_id,
          pictureUrl: checkSighting.picture_url,
          date: checkSighting.date,
          lat: checkSighting.lat,
          long: checkSighting.long,
        };
        setUserId(checkSighting.user_id);
        console.log(verifiedSighting);
      }

      if (confirmedSightings.length >= 5) {
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

      const addSighting = await ApiClient.post(
        `confirmedsightings/createConfirmedSighting`,
        verifiedSighting,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {})
        .catch((error) => {
          console.log(error.data);
        });

      const deleteSighting = await ApiClient.delete(
        `unverifiedsightings/deleteUnverifiedSightingById`,
        { data: { sightingId } }
      )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const decrementVote = async (sightingId: number) => {
    try {
      console.log(sightingId);
      const { data: response } = await ApiClient.put(
        `unverifiedsightings/decrementUserVote/${sightingId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-bg">
      <h2 className="header">Unconfirmed sightings that need your vote!</h2>
      <div className="list-of-cards">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          divider={<Divider orientation="vertical" flexItem />}
          style={{ maxWidth: 1000, overflow: "auto" }}
        >
          {sightings.slice(0, 5).map((sighting, index) => (
            <div key={`sightings-${index}`}>
              <div className="card">
                <Card sx={{ height: 300, width: 200 }}>
                  <CardActionArea>
                    <Link
                      className="sighting-button"
                      to={`/sightings/sightingpage/${sighting.sightingId}`}
                    >
                      <CardMedia
                        className="cardmedia"
                        component="img"
                        height="0"
                        image={sighting.pictureUrl}
                        alt="sighting"
                      />
                    </Link>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {new Date(sighting.date).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {sighting.organismName}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        Seen By {sighting.userName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {context?.userSession && context.userSession.accessToken && (
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => IncrementVote(sighting.sightingId)}
                      >
                        <ArrowCircleUpOutlinedIcon />
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => decrementVote(sighting.sightingId)}
                      >
                        <ArrowCircleDownOutlinedIcon />
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

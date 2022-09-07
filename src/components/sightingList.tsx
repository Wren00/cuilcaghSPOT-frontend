import axios from "axios";
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

export const SightingList = () => {
  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/unverifiedsightings/getAllUnverifiedSightings`
      );
      console.log(response);
      setSightings(response);
    };
    fetchData();
  }, []);

  const incrementVote = async (sightingId: number) => {
    let checkSighting;
    let verifiedSighting;

    try {
      const { data: response } = await axios.put(
        `http://localhost:5001/api/unverifiedsightings/incrementUserVote/` +
          sightingId
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
        console.log(verifiedSighting);

        const addSighting = await axios
          .post(
            `http://localhost:5001/api/confirmedsightings/createConfirmedSighting`,
            verifiedSighting,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.log(error.data);
          });

        const deleteSighting = await axios
          .delete(
            `http://localhost:5001/api/unverifiedsightings/deleteUnverifiedSightingById`,
            { data: { sightingId } }
          )
          .then((response) => {})
          .catch((error) => {
            console.log(error.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decrementVote = async (sightingId: number) => {
    try {
      console.log(sightingId);
      const { data: response } = await axios.put(
        `http://localhost:5001/api/unverifiedsightings/decrementUserVote/` +
          sightingId
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
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => incrementVote(sighting.sightingId)}
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
                </Card>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

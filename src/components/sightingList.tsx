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
    try {
      console.log(sightingId);
      const { data: response } = await axios.put(
        `http://localhost:5001/api/unverifiedsightings/incrementUserVote/` +
          sightingId
      );
      console.log(response);
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

  let id: number;

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

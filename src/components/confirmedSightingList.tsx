import axios from "axios";
import "../pages/css/species.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Stack } from "@mui/material";
import { ConfirmedSighting } from "../types/confirmedSighting.types";

export const ConfirmedSightingList = () => {
  const [sightings, setSightings] = useState<ConfirmedSighting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/confirmedsightings/getAllConfirmedSightings`
      );
      console.log(response);
      setSightings(response);
    };
    fetchData();
  }, []);

  return (
    <div className="card-bg">
      <h2 className="confirmed-header">Confirmed Sightings in Cuilcagh</h2>
      <div className="confirmed-list-of-cards">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          {sightings.slice(0, 5).map((sighting, index) => (
            <div key={`species-${index}`}>
              <div className="card">
                <Link
                  className="sighting-button"
                  to={`/sightings/sightingpage/${sighting.sightingId}`}
                >
                  <Card sx={{ height: 300, width: 200 }}>
                    <CardActionArea>
                      <CardMedia
                        className="cardmedia"
                        component="img"
                        height="0"
                        image={sighting.pictureUrl}
                        alt="sighting"
                      />
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
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

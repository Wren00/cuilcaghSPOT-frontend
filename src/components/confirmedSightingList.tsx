import "../pages/css/species.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Stack } from "@mui/material";
import { ConfirmedSighting } from "../types/confirmedSighting.types";
import { ApiClient } from "../utils";

export const ConfirmedSightingList = () => {
  const [sightings, setSightings] = useState<ConfirmedSighting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `confirmedsightings/getAllConfirmedSightings`
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
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {sightings.slice(0, 5).map((sighting, index) => (
            <div key={`sightings-${index}`}>
              <div className="card">
                <Link
                  className="sighting-button"
                  to={`/sightings/confirmedSightingPage/${sighting.sightingId}`}
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

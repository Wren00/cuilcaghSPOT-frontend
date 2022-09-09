import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnverifiedSighting } from "../types/sightings.types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { CardActionArea, Divider, Stack } from "@mui/material";
import * as React from "react";
import Auth from "./authorisation/context";
import { ApiClient } from "../utils";
import { Organism } from "../types/species.types";

export const FeaturedSpecies = () => {
  const [species, setSpecies] = useState<Organism[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `organisms/getAllOrganisms`
      );
      console.log(response);
      setSpecies(response);
    };
    fetchData();
  }, []);

  return (
    <div className="card-bg">
      <h2 className="header">Featured species!</h2>
      <div className="list-of-cards">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          divider={<Divider orientation="vertical" flexItem />}
          style={{ maxWidth: 1000, overflow: "auto" }}
        >
          {species.slice(0, 3).map((species, index) => (
            <div key={`species-${index}`}>
              <div className="card">
                <Card sx={{ height: 300, width: 200 }}>
                  <CardActionArea>
                    <Link
                      className="sighting-button"
                      to={`/species/${species.organismId}`}
                    >
                      <CardMedia
                        className="cardmedia"
                        component="img"
                        height="0"
                        image={species.pictureUrl}
                        alt="sighting"
                      />
                    </Link>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {species.taxonName}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {species.latinName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
};

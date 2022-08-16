import axios from "axios";
import '../pages/css/species.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnverifiedSighting } from "../types/sightings.types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import { Button, CardActionArea, CardActions, Divider, Stack } from '@mui/material';


export const SightingList = () => {



  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      const { data: response } = await axios.get(`http://localhost:5001/api/unverifiedsightings/getAllUnverifiedSightings`);
      console.log(response);
      setSightings(response);
    }
    fetchData();
  }, []);

  return (
    <div className='card-bg'>
      <h2 className='header'>Unconfirmed sightings that need your vote!</h2>
      <div className= 'list-of-cards'>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}>
        {
        
        (
          sightings.map((sighting, index) =>
            <div key={`species-${index}`}>
              <div className='card'>
              <Link className='sighting-button' to={`/sightings/sightingpage/${sighting.sightingId}`}>
                <Card sx={{ height: 300, width: 200 }}>
                  <CardActionArea>
                    <CardMedia
                      className='cardmedia'
                      component="img"
                      height="0"
                      image={sighting.pictureURL}
                      alt="sighting"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {new Date(sighting.date).toLocaleDateString()}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {sighting.organismName}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2" component="div">
                        Seen By {sighting.userName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <ArrowCircleUpOutlinedIcon />
                    </Button>
                    <Button size="small" color="primary">
                      <ArrowCircleDownOutlinedIcon />
                    </Button>
                  </CardActions>
                </Card>
                </ Link>
              </div>
            </div>
          ))}
      </Stack>
      </div>
    </div>
  )
}
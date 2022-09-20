import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./css/use.css";

const Use = () => (
  <div className="use">
    <h1 className="header">How to use this app...</h1>
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
        <div>
          <img
            className="use-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Cuilcagh_Mountain_Park_3.jpg/640px-Cuilcagh_Mountain_Park_3.jpg"
            alt="cuilcagh boardwalk"
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>
          If you'd like to become a Spotter and make some sightings... First of
          all, make an account <Link to={"./register"}>here!</Link>
          Then, click our sightings page to make a sighting. All you need is to
          know is: <br />- where you saw it <br />- when you saw it <br />- and
          have a picture to upload from your device!
          <br />
          After that, you can vote on other sightings if you agree with the
          other Spotters identification.
          <br />
          Once you have 5 or more confirmed sightings, you can become a trusted
          user, which means you can suggest new species for the database and
          make posts in our post section!
        </Typography>
        <Typography>
          HAVE FUN! ...and remember: <br />- don't litter <br />- don't hassle
          wildlife for photos. <br />
          Let's all leave as minimal an impact on the park as possible!
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default Use;

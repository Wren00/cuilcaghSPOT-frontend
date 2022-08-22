import { Link } from "react-router-dom";
import "./css/main.css";

function Home() {
  return (
    <div className="Home">
      <div className="mainpicture">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Cuilcagh%2C_Fermanagh_-_33673326901.jpg"
          alt="cuilcagh boardwalk"
        />
      </div>
      <div className="rowdiv">
        <div className="rowdiv-content">
          <p>
            The peatlands of Cuilcagh Park are 2,500 hectares of conserved land
            rich with unique plants and wildlife, with many on the NI Priority
            Species list. Wildlife Spotters like you can help us understand what
            species live in Cuilcagh and how they're doing. Want to help?
            <Link to="./register"> REGISTER</Link> here! Or if you're already a
            Spotter you can
            <Link to="./userLogin"> LOGIN</Link>
          </p>
          <p>Join us today!</p>
        </div>
      </div>
      <div className="map-main">
        <h2>SIGHTINGS MAP SCREENSHOT</h2>
      </div>
      <div className="featured">FEATURED SPECIES AND SIGHTINGS</div>
    </div>
  );
}

export default Home;

import { Link } from 'react-router-dom';
import './css/main.css';

function Home() {
  return <div className='Home'>
    <div className='mainpicture'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/b/b5/Cuilcagh%2C_Fermanagh_-_33673326901.jpg'></img>
    </div>
    <div className='rowdiv'>
      <p>The peatlands of Cuilcagh Park are 2,500 hectares of conserved land rich with unique plants and wildlife, with many on the NI Priority Species list.
        Wildlife Spotters like you can help us understand what species live in Cuilcagh and how they're doing.

        Want to help? <Link to="./register"> Register </Link> here!
        <br />
        Join us today!
        <br />
      </p>
    </div>
    <div className='map-main'>
      <h2>SIGHTINGS MAP SCREENSHOT</h2></div>
    <div className='featured'>
      FEATURED SPECIES AND SIGHTINGS
    </div>
  </div>
}

export default Home;
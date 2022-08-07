import axios from "axios";
import React from "react";
import Container from "@mui/material/Container";
import { Organism } from "../types/species.types";
import '../pages/css/species.css';


export default class OrganismList extends React.Component {
  organismsArray: Organism[] = [];
  state = {
    organisms: this.organismsArray
  }

  componentDidMount() {
    axios.get(`http://localhost:5001/api/organisms/getAllOrganisms`)
      .then(res => {
        const allOrganisms = res.data;
        this.setState({ organisms: allOrganisms });
        console.log(allOrganisms);
      })
  }

  render() {
    return (
      //<ul>
      <div>
        {
          this.state.organisms
            // .map(organism =>
            //   <li  key={organism.taxonName}>
            //     {organism.taxonName} - {organism.latinName}
            //     <img src={organism.pictureURL}></img>
            //   </li>
            //  )
            .map(organism =>
              <div>
                <div className='taxonName'>{organism.taxonName}</div>
                <div className='latinName'>{organism.latinName}</div>
                <div className='picture'><img src={organism.pictureURL}/></div>
              </div>
            )
            
        }
      </div>
      //</ul>
    )
  }
}

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import ReactDOM from "react-dom";
import SpeciesList from "../components/speciesList";
import './css/species.css';



const Species = () => (
  <div className='species'>
    <h1>What species live here?</h1>
    <br />
  <Grid item xs={6} md={8}>
    <Container maxWidth="sm">
    <SpeciesList />
    </Container>
    </Grid>
    <br />
  </div>
);

export default Species;

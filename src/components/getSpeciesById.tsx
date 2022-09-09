import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Organism } from "../types/species.types";
import { Button, Grid } from "@mui/material";
import * as React from "react";
import Auth from "./authorisation/context";
import { User } from "../types/users.types";
import jwtDecode from "jwt-decode";
import { ApiClient } from "../utils";

let userId: number = 0;
let trustedUser: boolean = false;

const SpeciesById = () => {
  const context = React.useContext(Auth.AuthContext);

  const token = context?.userSession.accessToken;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    userId = parseInt(decodedToken.userId);
  }

  const [user, setUser] = useState<User>();

  const [organism, setOrganism] = useState<Organism>();

  let { organismId } = useParams();
  let isProtected;

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `organisms/getOrganismById/${organismId}`
      );
      setOrganism(response);
    };
    fetchData();
  }, []);

  if (organism?.isProtected === true) {
    isProtected = "Protected Species";
  } else {
    isProtected = "Not Protected.";
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `users/getUserById/${userId}`
      );
      setUser(response);
    };
    fetchData();
  }, []);

  if (user) {
    if (user.userLevelId >= 2) {
      trustedUser = true;
    }
  }

  return (
    organism && (
      <div>
        <div key={`speciesID-${organism.taxonName}`}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div className="species-header">
                <Grid item xs={12} md={10}>
                  <div className="species-name"> {organism.taxonName} </div>
                  <div className="species-latinName">{organism.latinName}</div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <div className="isProtected">{isProtected}</div>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <div className="separator"></div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="largepicture">
                <img src={organism.pictureUrl} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="description">{organism.description}</div>
            </Grid>
          </Grid>
        </div>
        {trustedUser && (
          <p className="editprompt">
            Would you like to add or edit data on this page?
            <Link to="/species/post">Submit Data</Link>
          </p>
        )}
      </div>
    )
  );
};

export default SpeciesById;

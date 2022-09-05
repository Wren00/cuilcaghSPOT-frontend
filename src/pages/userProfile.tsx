import { Grid } from "@mui/material";
import "./css/profile.css";
import { UserProfile } from "../types/userProfile.types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types/users.types";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import * as React from "react";
import Auth from "../components/authorisation/context";
import jwtDecode from "jwt-decode";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const UserProfilePage = () => {
  let { id } = useParams();
  let parsedId: number = 0;
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<UserProfile>();

  //check user id matches currently logged in user

  const context = React.useContext(Auth.AuthContext);
  const token = context?.userSession.accessToken;

  let tokenId: number = 0;
  let isLoggedIn: boolean = false;

  if (id) {
    parsedId = parseInt(id);
  }

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    tokenId = parseInt(decodedToken.userId);
  }

  if (tokenId === parsedId) {
    isLoggedIn = true;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/users/getUserById/` + id
      );
      console.log(response);
      setUser(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/users/getProfileByUserId/` + id
      );
      console.log(response);
      setProfile(response);
    };
    fetchData();
  }, []);

  return (
    <div className="profile">
      <Grid container className="profile-main" spacing={2}>
        <Grid item className="username" xs={12}>
          <h1>{user?.userName}</h1>
        </Grid>
        <Grid item className="picture" md={6} sm={12}>
          <img
            src="https://i.ibb.co/LkXVPDM/514-5147366-default-avatar-comments-avatar.jpg"
            alt="profile picture"
          />
          {isLoggedIn && (
            <div className="div-with-picture-upload">
              <Tooltip title="Upload picture">
                <Button size="small" color="primary">
                  <AddPhotoAlternateIcon />
                </Button>
              </Tooltip>
            </div>
          )}
        </Grid>
        <Grid item className="message" md={6} sm={12}>
          {profile?.profileMessage}
          {isLoggedIn && (
            <div className="div-with-edit-button">
              <Tooltip title="Edit message">
                <Button size="small" color="primary">
                  <EditIcon />
                </Button>
              </Tooltip>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfilePage;

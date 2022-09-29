import { Grid, TextField } from "@mui/material";
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
import { SaveOutlined } from "@mui/icons-material";
import { AWSUpload } from "../components/awsUpload";
import { ApiClient } from "../utils";
import "./css/user-profile.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureUpload from "../components/profilePictureUpload";

const UserProfilePage = () => {
  let { id } = useParams();
  let parsedId: number = 0;
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<UserProfile>();
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [profileMessage, setProfileMessage] = useState<string>("");

  const context = React.useContext(Auth.AuthContext);
  const token = context?.userSession.accessToken;

  let tokenId: number = 0;
  let isLoggedIn: boolean = false;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

  const getUserId = async (uid: number) => {
    await ApiClient.get(`users/getUserById/${uid}`)
      .then((response) => {
        const { data } = response;
        if (data.userLevelId === 3) {
          setIsAdmin(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      getUserId(Number(decodedToken.userId));
    }
  }, [token]);

  const updateProfileMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setProfileMessage(event.target.value);
  };

  const toggleEditMode = () => {
    setIsEditMode(true);
  };

  const saveChanges = () => {
    if (profile && profileMessage) {
      console.log(pictureUrl);
      const updatedUserProfile: UserProfile = {
        profileId: parsedId,
        profileMessage: profileMessage,
        profilePicture: pictureUrl,
      };

      ApiClient.put("users/updateUserProfile", updatedUserProfile, {
        headers: { "Content-Type": "application/json" },
      })
        .then()
        .catch((error) => console.log(error));
    }
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(`users/getUserById/${id}`);
      setUser(response);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (pictureUrl !== "") {
      setProfile((prevProfile) => ({
        profileMessage: prevProfile.profileMessage,
        profileId: prevProfile.profileId,
        profilePicture: pictureUrl,
      }));
    }
  }, [pictureUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `users/getProfileByUserId/${id}`
      );
      if (response.profilePicture) {
        setProfile(response);
        setProfileMessage(response.profileMessage);
      } else {
        setProfile({
          profileMessage: response.profileMessage,
          profileId: response.profileId,
          profilePicture:
            "https://cuilcaghspot.s3.eu-west-1.amazonaws.com/userprofile.png",
        });
        setProfileMessage(response.profileMessage);
      }
    };
    fetchData();
  }, [id]);

  const updateUserDetails = () => {
    const updatedUser = {
      userId: parsedId,
      trustedUser: true,
    };

    ApiClient.put("users/updateUserDetails", updatedUser, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {})
      .catch((error) => console.log(error));
    console.log("Success");
  };

  const updateUserAdmin = () => {
    const updatedUser = {
      userId: parsedId,
      userLevelId: 3,
    };

    ApiClient.put("users/updateUserDetails", updatedUser, {
      headers: { "Content-Type": "application/json" },
    })
      .then()
      .catch((error) => console.log(error));
    console.log("Success");
  };

  const deleteUser = () => {
    const id = parsedId;
    ApiClient.put("users/deleteUserById", id, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  // @ts-ignore
  return (
    <div className="profile">
      <Grid container className="profile-main" spacing={2}>
        <Grid item className="username" xs={12}>
          <h1>{user?.userName}</h1>
        </Grid>
        <Grid item className="tagline" xs={12}>
          {isEditMode ? (
            <TextField
              value={profileMessage}
              onChange={(e) => updateProfileMessage(e)}
              id="outlined-basic"
              variant="outlined"
              fullWidth
              multiline
              className="input-message"
            />
          ) : (
            <div>{profileMessage}</div>
          )}
        </Grid>
        <Grid item className="picture" md={3} sm={6}>
          {profile && <img src={profile?.profilePicture} />}
        </Grid>
        <Grid className="upload-img">
          {isLoggedIn && (
            <PictureUpload
              pictureUrl={pictureUrl}
              setPictureUrl={setPictureUrl}
            />
          )}
        </Grid>

        <Grid item xs={10} className="user-profiles">
          <div>
            {isAdmin && (
              <Button variant="contained" onClick={updateUserDetails}>
                <VerifiedUserIcon
                  className="icon-btns"
                  onClick={updateUserDetails}
                />
                Set as Trusted{" "}
              </Button>
            )}
          </div>
          <div>
            {isAdmin && (
              <Button variant="contained" onClick={updateUserAdmin}>
                <SupervisorAccountIcon
                  className="icon-btns"
                  onClick={updateUserAdmin}
                />
                Set as Admin{" "}
              </Button>
            )}
          </div>
          <div>
            {isAdmin && (
              <Button variant="contained">
                <DeleteIcon className="icon-btns" onClick={deleteUser} /> Delete
                User
              </Button>
            )}
          </div>
        </Grid>
        <Grid item className="message edit-save" xs={2}>
          {isLoggedIn && (
            <>
              <div className="div-with-edit-button edit-save">
                <Tooltip title="Edit message">
                  <Button size="small" color="primary" onClick={toggleEditMode}>
                    <EditIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Save message">
                  <Button size="small" color="primary" onClick={saveChanges}>
                    <SaveOutlined />
                  </Button>
                </Tooltip>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfilePage;

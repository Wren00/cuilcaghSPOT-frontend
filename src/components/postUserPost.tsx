import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Auth from "./authorisation/context";
import jwtDecode from "jwt-decode";
import { ApiClient } from "../utils";
import { useForm } from "react-hook-form";
import "../pages/css/posts.css";

function PostUserPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const context = React.useContext(Auth.AuthContext);
  const token = context?.userSession.accessToken;

  let tokenId: number = 0;
  let isLoggedIn: boolean = false;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    tokenId = parseInt(decodedToken.userId);
    console.log(tokenId);
  }

  if (tokenId) {
    isLoggedIn = true;
  }

  const getUserById = async (uid: number) => {
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
      getUserById(Number(decodedToken.userId));
    }
  }, [token]);

  const onSubmit = (data: any) => {
    data.userId = tokenId;
    console.log(data);
    ApiClient.post("posts/createUserPost", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <Grid className="post-form-body">
        <Grid container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>What do you want to talk about?</Grid>
            <Grid item xs={12} sm={12}>
              <div className="add-post-title">Title</div>
              <TextField fullWidth id="input-title" variant="standard" />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <div className="add-post-content">Post Content</div>
              <TextField fullWidth id="input-content" variant="standard" />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              className="submit-post-btn"
            >
              Write Post
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export { PostUserPost };

import { Grid } from "@mui/material";
import { UserPosts } from "../types/userPosts.types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types/users.types";
import * as React from "react";
import Auth from "../components/authorisation/context";
import jwtDecode from "jwt-decode";
import { ApiClient } from "../utils";

const PostById = () => {
  let { id } = useParams();
  let postId: number = 0;
  let isAdmin: boolean = false;
  const [user, setUser] = useState<User>();
  const [post, setPost] = useState<UserPosts>();
  const navigate = useNavigate();

  const context = React.useContext(Auth.AuthContext);

  let userId: number = 0;

  const token = context?.userSession.accessToken;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    userId = parseInt(decodedToken.userId);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `users/getUserById/${userId}`
      );
      setUser(response);
    };
    fetchData();
  }, [userId]);

  if (user?.userLevelId === 3) {
    isAdmin = true;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(`posts/getPostById/${id}`);
      setPost(response);
    };
    fetchData();
  }, [id]);

  const deletePost = () => {
    ApiClient.delete(`posts/deletePostById`, { data: { postId } })
      .then((response) => {
        console.log(response);
        navigate("./posts/");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div className="profile">
      <Grid container className="posts-main" spacing={2}>
        <Grid item className="post-title" xs={12}>
          {post?.postTitle}
        </Grid>
        <Grid item className="post-content" xs={12}>
          {post?.postContent}
        </Grid>
      </Grid>
      <div>
        {context?.userSession && context.userSession.accessToken && isAdmin && (
          <button onClick={deletePost}>Delete Post</button>
        )}
      </div>
    </div>
  );
};

export default PostById;

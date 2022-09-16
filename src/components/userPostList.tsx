import { UserPosts } from "../types/userPosts.types";
import { Box, Button, Grid, Input, Table } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { User } from "../types/users.types";
import { ApiClient } from "../utils";
import Auth from "./authorisation/context";
import jwtDecode from "jwt-decode";
import "../pages/css/posts.css";

export const PostsList = () => {
  const [posts, setPosts] = useState<UserPosts[]>([]);
  const [name, setName] = useState("");
  const [pageData, setPageData] = useState<UserPosts[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setUser] = React.useState<User>();
  const context = React.useContext(Auth.AuthContext);

  let userId: number = 0;
  let trustedUser: boolean = false;

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

  if (user?.trustedUser === true) {
    trustedUser = true;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleNewPage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setPageData(posts.slice(newPage * 10, newPage * 10 + 9));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(`posts/getAllUserPosts`);
      setPosts(response);
      setPageData(response.slice(0, 9));
    };
    fetchData();
  }, []);

  return (
    <div className="post-list">
      <Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <h1 className="journal-post-title">JOURNAL POSTS </h1>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <div className="add-post-button">
                {" "}
                {context?.userSession &&
                  context.userSession.accessToken &&
                  trustedUser && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ color: "white" }}
                    >
                      Add Post
                    </Button>
                  )}
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Paper sx={{ width: "100%" }}>
            <Input
              type="text"
              className="search"
              placeholder="Search posts..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {pageData
              .filter((value) => {
                if (name === "") {
                  return value as UserPosts;
                } else if (
                  value.postContent
                    .toLowerCase()
                    .includes(name.toLowerCase()) ||
                  value.postTitle.toLowerCase().includes(name.toLowerCase()) ||
                  value.authorName.toLowerCase().includes(name.toLowerCase())
                ) {
                  return value as UserPosts;
                }
              })
              .map((post, index) => (
                <div key={`post-${index}`}>
                  <div className="user-post-container">
                    <Link className="post-button" to={`/posts/${post.postId}`}>
                      {post.postTitle}
                    </Link>
                    <div className="post-content">{post.postContent}</div>
                  </div>
                  <div className="user">Written By: {post.authorName}</div>
                </div>
              ))}
            <TablePagination
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleNewPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

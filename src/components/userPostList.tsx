import { UserPosts } from "../types/userPosts.types";
import { Input, Table } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { User } from "../types/users.types";
import { ApiClient } from "../utils";

export const PostsList = () => {
  const [posts, setPosts] = useState<UserPosts[]>([]);
  const [userName, setUserName] = useState<User>();
  const [name, setName] = useState("");
  const [pageData, setPageData] = useState<UserPosts[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <div>
      <Paper sx={{ width: "100%" }}>
        <Table className="list">
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
                value.postContent.toLowerCase().includes(name.toLowerCase()) ||
                value.postTitle.toLowerCase().includes(name.toLowerCase())
              ) {
                return value as UserPosts;
              }
            })
            .map((post, index) => (
              <div key={`post-${index}`}>
                <div className="postTitle">
                  <Link className="post-button" to={`/posts/${post.postId}`}>
                    {post.postTitle}
                  </Link>
                  <div className="post-content">{post.postContent}</div>
                </div>
              </div>
            ))}
        </Table>
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
    </div>
  );
};

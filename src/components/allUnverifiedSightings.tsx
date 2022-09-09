import { UnverifiedSighting } from "../types/sightings.types";

import {
  Avatar,
  Input,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Table,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { ApiClient } from "../utils";

export const UnverifiedSightingList = () => {
  const [sightings, setSightings] = useState<UnverifiedSighting[]>([]);

  const [name, setName] = useState("");
  const [pageData, setPageData] = useState<UnverifiedSighting[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleNewPage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setPageData(sightings.slice(newPage * 10, newPage * 10 + 9));
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
      const { data: response } = await ApiClient.get(
        `unverifiedsightings/getAllUnverifiedSightings`
      );
      setSightings(response);
      setPageData(response.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <Table className="list">
          {pageData
            .filter((value) => {
              if (name === "") {
                return value as UnverifiedSighting;
              } else if (
                value.organismName.toLowerCase().includes(name.toLowerCase()) ||
                value.userName.toLowerCase().includes(name.toLowerCase())
              ) {
                return value as UnverifiedSighting;
              }
            })
            .map((sighting, index) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 1,
                  bgcolor: "background.paper",
                }}
              >
                <Link
                  className="species-button"
                  to={`/sightings/sightingpage/${sighting.sightingId}`}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="species" src={sighting.pictureUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={sighting.organismName}
                      secondary={sighting.userName}
                    />
                  </ListItemButton>
                </Link>
              </List>
            ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={sightings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleNewPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

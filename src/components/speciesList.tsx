import { Organism } from "../types/species.types";
import "../pages/css/species.css";
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

export const SpeciesList = () => {
  const [organisms, setOrganism] = useState<Organism[]>([]);

  const [name, setName] = useState("");
  const [pageData, setPageData] = useState<Organism[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleNewPage = (event: unknown, newPage: number) => {
    console.log(newPage);
    setPageData(organisms.slice(newPage * 10, newPage * 10 + 10));
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
        `organisms/getAllOrganisms`
      );
      setOrganism(response);
      setPageData(response.slice(0, 9));
    };
    fetchData();
  }, []);

  const getByGroupId = (taxonGroupId: number) => {
    console.log(taxonGroupId);
    ApiClient.get("organisms/getOrganismByTaxonGroupId/" + taxonGroupId)
      .then((response) => {
        setPageData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <div className="groupfilter">
          <select name="Group">
            <option value="all">All</option>
            <option value="Amphibians" onClick={() => getByGroupId(1)}>
              Amphibians
            </option>
            <option value="Mammals" onClick={() => getByGroupId(2)}>
              Mammals
            </option>
            <option value="Birds" onClick={() => getByGroupId(3)}>
              Birds
            </option>
            <option value="Plants" onClick={() => getByGroupId(4)}>
              Plants
            </option>
            <option
              value="Butterflies and Moths"
              onClick={() => getByGroupId(5)}
            >
              Butterflies and Moths
            </option>
            <option
              value="Other Insects and Arthropods"
              onChange={() => getByGroupId(6)}
            >
              Other Insects and Arthropods
            </option>
          </select>
        </div>
        <Table className="list">
          <Input
            type="text"
            className="search"
            placeholder="Search species..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {pageData
            .filter((value) => {
              if (name === "") {
                return value as Organism;
              } else if (
                value.taxonName.toLowerCase().includes(name.toLowerCase()) ||
                value.latinName.toLowerCase().includes(name.toLowerCase())
              ) {
                return value as Organism;
              }
            })
            .map((organism, index) => (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 1,
                  bgcolor: "background.paper",
                }}
              >
                <Link
                  className="species-button"
                  to={`/species/${organism.organismId}`}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="species" src={organism.pictureUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={organism.taxonName}
                      secondary={organism.latinName}
                    />
                  </ListItemButton>
                </Link>
              </List>
            ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={organisms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleNewPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

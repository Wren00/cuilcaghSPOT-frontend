import axios from "axios";
import { Organism } from "../types/species.types";
import "../pages/css/species.css";
import { Input, Table } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { GroupFilter } from "./taxonGroupFilter";

export const SpeciesList = () => {
  const [organisms, setOrganism] = useState<Organism[]>([]);
  const [name, setName] = useState("");

  const [pageData, setPageData] = useState<Organism[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePagination = (
    //when click on page increase or decrease page number and update page data
    event: any,
    pageNumber: number
  ) => {
    console.log(pageNumber);
    const indexStart = pageNumber * 10;
    const newPageData = organisms.slice(indexStart, indexStart + 9);
    console.log(newPageData);
    setPageData(newPageData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/organisms/getAllOrganisms`
      );
      setOrganism(response);

      const indexData = response.slice(0, 9);
      setPageData(indexData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <Table className="list">
          <GroupFilter />
          <Input
            type="text"
            className="search"
            placeholder="Search species..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {pageData &&
            pageData
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
                <div key={`species-${index}`}>
                  <div className="taxonName">
                    <Link
                      className="species-button"
                      to={`/species/${organism.organismId}`}
                    >
                      {organism.taxonName}
                    </Link>
                    <div className="latinName">{organism.latinName}</div>
                  </div>
                </div>
              ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={organisms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePagination}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

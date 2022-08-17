import axios from "axios";
import { Organism } from "../types/species.types";
import '../pages/css/species.css';
import { Input, Table } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from "react";
import { GroupFilter } from "./taxonGroupFilter";

interface Column {
  id: 'Common name' | 'Latin name'; 
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}


export const SpeciesList = () => {

  const [organisms, setOrganism] = useState<Organism[]>([]);
  const [name, setName] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {

      const { data: response } = await axios.get(`http://localhost:5001/api/organisms/getAllOrganisms`);
      setOrganism(response);
    }
    fetchData();
  }, []);
//Where to put a taxon group filter?
  return (
    <div>
    <Paper sx={{ width: '100%'}}>
      <Table className='list'>
        <GroupFilter />
        <Input type="text" className="search" placeholder="Search species..." onChange={(e) => { setName(e.target.value) }} />
          {(
            organisms.filter((value) => {
            if (name === "") {
              return value as Organism;
            } else if (value.taxonName.toLowerCase().includes(name.toLowerCase()) || value.latinName.toLowerCase().includes(name.toLowerCase())) 
            {
              return value as Organism;
            }}).map((organism, index) =>
              <div key={`species-${index}`}>
                <div className='taxonName'>
                  <Link className='species-button' to={`/species/${organism.organismId}`}>
                    {organism.taxonName}
                  </Link>
                  <div className='latinName'>{organism.latinName}</div>
                  </div>
              </div>
            ))
        }
         </Table>
         <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={organisms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
    </div>
  )
}



import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect } from "react";

export default function DynamicTable() {
  interface Column {
    id: "common-name" | "latin-name" | "type";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    {
      id: "common-name",
      label: "Common Name",
      minWidth: 150,
      align: "right",
    },
    { id: "latin-name", label: "Latin Name", minWidth: 100 },
    {
      id: "type",
      label: "Type",
      minWidth: 100,
    },
  ];

  interface Data {
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
  }

  function createData(
    taxonName: string,
    latinName: string,
    taxonGroupId: number
  ) {
    return { taxonName, latinName, taxonGroupId };
  }

  const rows = [];

  const [species, setSpecies] = React.useState();
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

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/organisms/getAllOrganisms`
      );
      console.log(response);
      setSpecies(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      {species && (
        <>
          {/* Table */}
          <div>
            <Paper sx={{ width: "80%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </>
      )}
    </div>
  );
}

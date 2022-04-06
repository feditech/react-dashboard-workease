import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from "react-router-dom";
import { Button } from '@mui/material';

export default function BasicTable(props) {
  const location = useLocation().pathname.split("/");
  const { handleClick, handleEdit,handleView } = props
  console.log(props)
  const [rows, setRows] = React.useState(props.data ? props.data : [])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // React.useEffect(() => {
  //   props.data && setRows(props.data)
  // }, [])
  
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.head ? props.head.map(h =>
                <TableCell key={h.id}>{h.name}</TableCell>
              ) :
                <>
                  {/* <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </>}



            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              location[2] === "customers" ?
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell >{row.namePrefix}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.lastName}
                  </TableCell>
                  <TableCell >{row.email}</TableCell>
                  <TableCell >{row.phoneNumber}</TableCell>
                  <TableCell >{row.organization}</TableCell>
                  <TableCell >{row.taxNo}</TableCell>
                  <TableCell >{row.customerType}</TableCell>
                  <TableCell >{row.address}</TableCell>
                  <TableCell> <Button onClick={() => handleEdit(row)}>Edit</Button></TableCell>
                </TableRow>
                : location[2] === "services" ?
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell >{row.description}</TableCell>
                    <TableCell >{row.amount}</TableCell>
                    <TableCell><Button onClick={() => handleEdit(row)}>Edit</Button></TableCell>
                  </TableRow>
                  : location[1] === "dashboard" ?
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell >{row.customerId.name}</TableCell>
                      <TableCell ><Chip label={row.invoiceStatus} color={row.invoiceStatus === 'paid' ? 'success' :'error'} /></TableCell>
                      <TableCell >{row.total}</TableCell>
                      <TableCell> <Button onClick={() => handleView(row._id)}>View</Button></TableCell>
                    </TableRow>
                    :
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
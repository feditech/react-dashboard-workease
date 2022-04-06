import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormDialog from "../Customers/editCustomer";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export default function Deposits(props) {
  const [open, setOpen] = useState(false)

  const {
    customer,
    editCustomer
  } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div style={{ height: '135px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex' }}>
          <Typography component="h3" variant="p" color={"secondary"}     >
            {customer.namePrefix} {customer.firstname} {customer.lastname}
          </Typography>
          <IconButton style={{margin:'0 8px', padding:0}} onClick={handleClickOpen}>
            <EditIcon color='primary' />
          </IconButton>
        </div>{" "}
        <Grid>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >
              Organization:{"  "}{" "}
            </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {customer.organization}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >Email:{"  "} </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {customer.email}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >Phone:{"  "} </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {customer.phoneNumber}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >Type:{"  "}</Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {customer.customertype}
            </Typography>
          </div>
        </Grid>
        <FormDialog
          editCustomer={editCustomer}
          open={open}
          handleClose={handleClose}
          customer={customer}
        />
      </div>
    </React.Fragment>
  );
}

import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Title from "../Title/Title";
import CountUp from "react-countup";
import Chip from "@mui/material/Chip";

export default function Deposits(props) {
  const {
    total,
    VAT,
    subTotal,
    createdAt,
    unit,
    handleView,
    _id,
    namePrefix,
    firstname,
    lastname,
    
    invoiceStatus,
  } = props;

  return (
    <React.Fragment>
      <div style={{height:'135px'}}>
    <div style={{}}>
        <Typography component="p" variant="p"       >Quotation# {"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {_id}
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <Typography sx={{ 'marginRight':1}} component="p" variant="p"      >Name:{"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {namePrefix}. {firstname} {lastname}
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <Typography sx={{ 'marginRight':1}} component="p" variant="p"      >Issue Date:{"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {createdAt.slice(0, 10)}
        </Typography>
      </div>
     
      <Grid container> 
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Button
            sx={{marginTop:1, boxShadow:1,
              fontFamily:"PT Sans Narrow"}}
            onClick={() => handleView(_id)}
            color="secondary"
            variant="outlined"
          >
            View Quotation
          </Button>
        </Grid>
      
        </Grid>

        </div>
     
    </React.Fragment>
  );
}

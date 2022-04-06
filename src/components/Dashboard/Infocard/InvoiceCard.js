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
    handlePay,
    invoiceStatus,
  } = props;

  return (
    <React.Fragment>
      <div style={{height:'135px',display:'flex'  , flexDirection: 'column',  justifyContent:'space-between' }}>
      <div style={{ display:'flex'}}>
        <Typography component="p" variant="p"    sx={{ 'marginRight':1}} >Invoice# {"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {_id}
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <Typography sx={{ 'marginRight':1}} component="p" variant="p"   >Name:{"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {namePrefix}. {firstname} {lastname}
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <Typography sx={{ 'marginRight':1}} component="p" variant="p"   >Issue Date:{"  "} </Typography>
        <Typography component="p" variant="p" color={"text.secondary"}>
          {createdAt.slice(0, 10)}
        </Typography>
      </div>
      <Grid container sx={{justifyContent:'space-between'}} > 
        <Grid xs={5} sm={5} md={3} lg={4}  >
          <Button
            sx={{marginTop:2, boxShadow:1,
              fontFamily:"PT Sans Narrow"}}
            onClick={() => handleView(_id)}
            color='secondary'
            variant="outlined"
          >
            View Invoice
          </Button>
        </Grid>
        <Grid xs={5} sm={6} md={4} lg={6} >
          {/* { invoiceStatus === 'unpaid' ? () : ()  } */}
          
          {invoiceStatus === "unpaid" ? ( <Button
            sx={{marginTop:2, boxShadow:1, 
              fontFamily:"PT Sans Narrow" ,}}
            onClick={() => handlePay(_id)}
            color='secondary'
            variant="outlined"

          >
            Mark as Paid
          </Button>): ([])}
        </Grid>
        <Grid xs={2} sm={6} md={2} lg={1} ></Grid>

        </Grid>
      {invoiceStatus === "unpaid" ? (
        <Chip
          sx={{
            width: 60,
            color:'#fff',
            background:'#b50000',
            position: "absolute",
            fontFamily:"PT Sans Narrow",
            right: 0,
            bottom: 0,
            fontSize:14,
            fontWeight:500,
            borderBottomRightRadius:0,
            borderTopRightRadius:0
         
          }}
          // color="danger"
          label="Unpaid"
        />
      ) : (
        <Chip
          sx={{
            width: 60,
            position: "absolute",
            position: "absolute",
            fontFamily:"PT Sans Narrow",
            right: 0,
            bottom: 0,
            fontSize:14,
            fontWeight:500,
            borderBottomRightRadius:0,
            borderTopRightRadius:0,
            background:'#35BE25 ',
            color:"#fff"
            
          }}
          label="Paid"
          // color="success"

        />
      )}
      </div>
    </React.Fragment>
  );
}

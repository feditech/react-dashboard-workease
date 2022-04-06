import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';
import CountUp from "react-countup";

export default function Deposits(props) {
  const { name, number } = props;

  return (
    <React.Fragment>
      <Typography component="h3" variant="p"   color={"secondary"}       >
      {name}
        </Typography>
      
      <Typography sx={{marginTop:1}} component="p" variant="h4" color={"text.secondary"}>
        <CountUp start={0} end={number} duration={2.5} separator="," />
      </Typography>
    </React.Fragment>
  );
}
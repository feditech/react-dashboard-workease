import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from './editPopup';
import {
  updateCompany,
} from "../../Api/services";

const Profile = () => {
  // const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  let location = window.location.hostname.split(':')
  const { user, company } = useSelector((state) => {
    return {
      user: state.user,
      company: state.company[0]
    }
  })
  let upperStr = user.name.toUpperCase()
  // console.log(location[0])
  console.log('company.......DDD.', company)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editCompany = async (obj) => {
    if (obj !== "") {
      console.log(obj);
      const data = await updateCompany(obj);
      if (data !== "Error") {
        console.log('updaaaaaaaaaateeee', data);
        dispatch({ type: "UPDATECOMPANY", payload: data });
        // setCustomerObj("")
      }
    }
  };
  return (
    <>
      <Box>
        <Paper sx={{ maxWidth: 1000, my: 3, mx: 'auto', p: 2 }}>

          <Grid container zeroMinWidth justifyContent="center" alignItems="center" >
            <Grid item xs={10}>
              <Typography component="h2" variant="h6" color="primary">Company profile
                <IconButton onClick={handleClickOpen}>
                  <EditIcon color='primary' />
                </IconButton></Typography>

            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={6}>
              <Typography component="p"> Company Name</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{company.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p"> Email Address</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{company.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p"> Phone Number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p"> {company.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">Address</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">{company.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p">logo</Typography>
            </Grid>
            <Grid item xs={6}>
              <img src={`http://${location[0]}:${2025}/image/${company.logo}`} alt="Logo" style={{ width: 80 }} />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ maxWidth: 1000, my: 3, mx: 'auto', p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6" color="primary" >Payment Info</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component="p">Card Holder name</Typography>
              <Typography component="p">demo</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component="p" > Card Number</Typography>
              <Typography component="p">**** **** **** 1234</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component="p">Expiry Date</Typography>
              <Typography component="p">10/21</Typography>
            </Grid>
          </Grid>
        </Paper>
        <FormDialog
          editCompany={editCompany}
          open={open}
          handleClose={handleClose}
          company={company}
        />
      </Box>
    </>
  )
}

export default Profile

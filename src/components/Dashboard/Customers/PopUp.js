import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import MySelect from "../Select/Select";

export default function FormDialog(props) {
  const userId = useSelector((state) => state.user.clientId);
  const { open, handleClose, obj, addCustomer, editCustomer } = props;

  // const [customerName, setCustomerName] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxno, setTaxNo] = useState("");
  const [namePrefix, setNamePrefix] = useState("");
  const [customertype, setCustomerType] = useState("");
  
  const handleOnSubmit = () => {
    if (obj === "") {
      let newObj = {
        name: firstname + ' ' + lastname,
        taxno,
        firstname,
        lastname,
        namePrefix,
        customertype,
        email,
        address,
        phoneNumber,
        organization,
        clientId: userId,
        isActive: true,
      };
      addCustomer(newObj);
      console.log(newObj);
    } else if (obj !== "") {
      console.log("EDIT");
      console.log(obj);
      let newObj = {
        // name: firstname + ' ' + lastname,
        namePrefix,
        firstname,
        lastname,
        taxno,
        customertype,
        organization,
        email,
        address,
        phoneNumber,
        _id: obj._id,

      };
      console.log(newObj);
      editCustomer(newObj);
    }
    onClose();
  };
  useEffect(() => {
    if (obj !== "") {
      setNamePrefix(obj.namePrefix);
      setFirstName(obj.firstname);
      setLastName(obj.lastname);
      setTaxNo(obj.taxno);
      setCustomerType(obj.customerType);
      setEmail(obj.email);
      setOrganization(obj.organization);
      setPhoneNumber(obj.phoneNumber);
      setAddress(obj.address);
    }
  }, [obj]);
  const onClose = () => {
    setNamePrefix("");
    setFirstName("");
    setLastName("");
    setTaxNo("");
    setCustomerType("")
    setEmail("");
    setOrganization("");
    setPhoneNumber("");
    setAddress("");
    handleClose();
  };
  return (
    // <div>
    <Dialog open={open} onClose={onClose} sx={{ marginTop: '40px' }} >
      <DialogTitle color={'primary'} sx={{ fontFamily: "PT Sans Narrow", }}>Customers</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent={"space-between"}
          sx={{ marginTop: '3px' }}
        >

          <Grid
            // fullwidth
            item xs={12} md={4}
            fullWidth>
            <MySelect options={['Mr', 'Mrs', 'Miss', 'M/s']} label={'Mr/Mrs'}
              value={namePrefix} onChange={(e) => setNamePrefix(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField

              fullWidth
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>




          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Organization"
              variant="outlined"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Tax no"
              variant="outlined"
              value={taxno}
              onChange={(e) => setTaxNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <MySelect options={['Individual', 'Business']} label={'Type'}
              value={customertype} onChange={(e) => setCustomerType(e.target.value)}
              fullwidth />
          </Grid>


          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button onClick={handleOnSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    // </div>
  );
}

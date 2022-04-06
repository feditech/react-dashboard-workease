import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import MySelect from '../Select/Select'

export default function FormDialog(props) {
    const userId = useSelector((state) => state.user.clientId);
    // const user = useSelector((state) => state.user);
    const { open, handleClose, customer, editCustomer } = props;

    const [namePrefix, setNamePrefix] = useState(customer.namePrefix);
    const [firstname, setFirstName] = useState(customer.firstname);
    const [lastname, setLastName] = useState(customer.lastname);
    const [organization, setOrganization] = useState(customer.organization);
    const [email, setEmail] = useState(customer.email);
    const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
    const [address, setAddress] = useState(customer.address);
    const [customertype, setType] = useState(customer.customertype);


    const handleOnSubmit = () => {
        console.log("EDIT");
        // console.log(obj);
        let newObj = {
            namePrefix,
            firstname,
            lastname,
            organization,
            email,
            address,
            phoneNumber,
            customertype,
            _id: customer._id,
        };
        console.log(newObj);
        editCustomer(newObj);

        onClose();
    };
    // useEffect(() => {
    //     if (company !== "") {
    //         setName(company.name);
    //         setEmail(company.email);
    //         setPhoneNumber(company.phoneNumber);
    //         setOrganization()
    //         setAddress(company.address);
    //         setVat(company.vat)
    //     }
    // }, [company]);
    const onClose = () => {
        // setName("");
        // setEmail("");
        // setPhoneNumber("");
        // setAddress("");
        // setVat('')
        handleClose();
    };
    // console.log(company)
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
                            label="Type"
                            variant="outlined"
                            value={customertype}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            multiline
                            rows={4}
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
                    Update
                </Button>
            </DialogActions>
        </Dialog>
        // </div>
    );
}

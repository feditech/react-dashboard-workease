import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";


export default function FormDialog(props) {
    const userId = useSelector((state) => state.user.clientId);
    // const user = useSelector((state) => state.user);
    const { open, handleClose, company, editCompany } = props;

    const [name, setName] = useState(company.name);
    const [email, setEmail] = useState(company.email);
    const [phoneNumber, setPhoneNumber] = useState(company.phoneNumber);
    const [address, setAddress] = useState(company.address);
    const [vat, setVat] = useState(company.vat);


    const handleOnSubmit = () => {
        console.log("EDIT");
        // console.log(obj);
        let newObj = {
            name,
            email,
            address,
            phoneNumber,
            vat,
            clientId: userId,
            _id: company._id,

        };
        console.log(newObj);
        editCompany(newObj);

        onClose();
    };
    useEffect(() => {
        if (company !== "") {
            setName(company.name);
            setEmail(company.email);
            setPhoneNumber(company.phoneNumber);
            setAddress(company.address);
            setVat(company.vat)
        }
    }, [company]);
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

                    <Grid item xs={12} md={6}>
                        <TextField

                            fullWidth
                            id="outlined-basic"
                            label="Company Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            label="VAT"
                            variant="outlined"
                            value={vat}
                            onChange={(e) => setVat(e.target.value)}
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

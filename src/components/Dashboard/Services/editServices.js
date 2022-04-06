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
    const { open, handleClose, service, editService } = props;


    const [name, setName] = useState(service.name);
    const [description, setDescription] = useState(service.description);
    const [amount, setAmount] = useState(service.amount);
    const [unit, setUnit] = useState(service.unit);
    const [type, setType] = useState(service.type);


    const handleOnSubmit = () => {
        console.log("EDIT");
        // console.log(obj);
        let newObj = {
            _id: service._id,
            clientId: userId,
            isActive: true,
            name,
            description,
            amount,
            unit,
            type,
        };
        console.log(newObj);
        editService(newObj);

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
            <DialogTitle color={'primary'} sx={{ fontFamily: "PT Sans Narrow", }}>Services</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} p={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MySelect
                            label="Unit"
                            options={["KG", "KM", "MT"]}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MySelect
                            label="Item type"
                            options={["Goods", "Service"]}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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

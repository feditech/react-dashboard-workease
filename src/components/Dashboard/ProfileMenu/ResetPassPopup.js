import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FloatingActionButtons from '../FloatingButton/FloatingActionButtons';
import BasicTable from '../TableList/BasicTable';
import { Box } from '@mui/system';
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import { createCustomers } from '../../Api/services';

export default function FormDialog(props) {
    const userId = useSelector((state) => state.user.clientId)
    const { open, handleClose } = props;
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const CheckPassword = (newPassword) => {
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (newPassword.match(passw)) {
            return true;
        }
        else {
            return false;
        }
    }
    const ConfirmPasswordCheck = () => {
        if (newPassword === confirmPassword) {
            setConfirmPasswordError("Matched")
        }
        else {
            setConfirmPasswordError("Not Matched")
        }
    }
    const PasswordCheck = () => {
        if (CheckPassword(newPassword)) {
            setPasswordError("Strong")
            ConfirmPasswordCheck();
        }
        else {
            setPasswordError("Weak")
        }
    }

    const Submit = (e) => {
        e.preventDefault();
        console.log("clicked")
        PasswordCheck();
        if(CheckPassword(newPassword)){
            let obj = { oldPassword, newPassword, confirmPassword }
                    console.log(obj)
        }
        else{
            console.log("error")
        }
        // if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
        //     if (newPassword === confirmPassword) {
        //         let obj = { oldPassword, newPassword, confirmPassword }
        //         console.log(obj)
        //     }
        //     else {
        //         console.log("pass not matched")
        //     }
        // }
    }

    //  console.log(oldPassword,newPassword,confirmPassword)
    return (
        <div>


            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Reset Password</DialogTitle>

                <DialogContent >
                    <Grid container spacing={3} p={2}  >

                        <Grid item xs={12} md={12}  >
                            <TextField
                                fullWidth id="outlined-basic" type="password" label="Enter Old password" variant="outlined"
                              
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} >
                            <TextField
                                fullWidth id="outlined-basic" type="password" label="Enter New Password" variant="outlined"
                                helperText={passwordError + "   " + " ( password must be 8 to 14 characters long , combination of letters and numbers)"}
                                value={newPassword}
                                onChange={(e) => {
                                    setnewPassword(e.target.value)
                                    PasswordCheck()
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth id="outlined-basic" type="password" label="Confirm Password" variant="outlined"
                                helperText={confirmPasswordError}
                                value={confirmPassword}
                                onChange={(e) => setconfirmPassword(e.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth id="outlined-basic" label="Address" variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Grid> */}

                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={Submit}>Submit</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
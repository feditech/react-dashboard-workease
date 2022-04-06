import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { createCompany, updateCompany } from '../../Api/services'

export default function FormDialog(props) {
    const dispatch = useDispatch()
    const { user, company } = useSelector((state) => {
        return {
            user: state.user,
            company: state.company
        }
    })
    const { open, handleClose } = props;
    const [isCompany, setIsCompany] = useState(false)
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [vat, setVat] = useState("");
    const [isCliceked, setIsCliked] = useState(false)
    useEffect(() => {
        setEmail(user.email)
    }, [user])
    const handleOnSubmit = async () => {
        setIsCliked(true)
        if (name !== "" && email !== "" && phoneNumber !== "" && address !== "" && vat !== "") {
            let newObj = {
                name,
                email,
                address,
                phoneNumber,
                vat,
                clientId: user.clientId,
                isActive: true
            }
            console.log('neeeeeeeeeeeeeew', newObj)
            const data = await createCompany(newObj)
            if (data !== "Error") {
                console.log(data.success)
                dispatch({ type: "COMPANYCREATED", payload: data.sucess })
                // onClose();
                setIsCompany(true)
                setIsCliked(false)


            } else {
                setIsCliked(false)
            }
        }
        console.log("clicked")
    }
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', image)
        await fetch(`http://${window.location.hostname}:2025/api/uploadLogo`, { // Your POST endpoint
            method: 'POST',
            body: formData // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            async (success) => {
                let obj = company
                console.log('objjjj', obj)
                obj = {
                    ...obj,
                    logo: success.filePath
                }
                console.log(obj)
                let data = await updateCompany(obj)
                console.log(data)
                if (data !== "Error") {
                    dispatch({ type: "COMPANYCREATED", payload: data })
                    onClose();
                }
            } // Handle the su}ccess response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    }

    const onClose = () => {
        setName("")
        setEmail("")
        setPhoneNumber("")
        setAddress("")
        setVat("")
        handleClose();
    }
    console.log(image, 'image', company)
    useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])
    return (
        <div>
            <Dialog open={open} fullWidth>
                <DialogTitle>Company Info</DialogTitle>
                {
                    isCompany ?
                        <>

                            <DialogContent>
                                <Grid container justifyItems="center">
                                    <Grid item xs={12}>
                                        {image && <img src={preview} alt='img' />}
                                    </Grid>
                                    <input
                                        name="selfie"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="selfie"
                                        multiple
                                        type="file"
                                        // value={props.data.selfie}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <label htmlFor="selfie">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            component="span"
                                            style={{
                                                fontSize: "13px",
                                                marginBottom: 5,
                                                marginTop: 5,
                                            }}
                                            fullWidth
                                        >
                                            ATTACH
                                        </Button>
                                    </label>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleUpload} disabled={isCliceked} variant="contained">{isCliceked ? <CircularProgress /> : "Save"}</Button>
                            </DialogActions>
                        </>



                        :
                        <>
                            <DialogContent>
                                <Grid container spacing={3} p={2}>
                                    <Grid item xs={12}  >
                                        <TextField
                                            fullWidth id="outlined-basic" label="Name" variant="outlined"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}  >
                                        <TextField
                                            fullWidth id="outlined-basic" label="Email" variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth id="outlined-basic" label="Phone Number" variant="outlined"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth id="outlined-basic" label="Address" variant="outlined"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            multiline
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth id="outlined-basic" label="VAT" variant="outlined"
                                            value={vat}
                                            onChange={(e) => setVat(e.target.value)}
                                            multiline
                                        />
                                    </Grid>


                                </Grid>

                            </DialogContent>
                            <DialogActions>
                                {/* <Button onClick={onClose} variant="outlined">Close</Button>  */}
                                <Button onClick={handleOnSubmit} disabled={isCliceked} variant="contained">{isCliceked ? <CircularProgress /> : "Save"}</Button>
                            </DialogActions>
                        </>}
            </Dialog>
        </div>
    );
}
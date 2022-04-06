// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { Grid } from '@mui/material'
// import { useSelector } from 'react-redux';

// export default function FormDialog(props) {
//     const userId = useSelector((state) => state.user.clientId)
//     const { open, handleClose, obj, editServices, addServices } = props;
//     const [namePop, setNamePop] = useState("");
//     const [descriptionPop, setDescriptionPop] = useState("");
//     const [amountPop, setAmountPop] = useState(0);
//     const handleOnSubmit = (e) => {
//         if (obj === "") {
//             console.log("ADD")
//             let newObj = {
//                 clientId: userId,
//                 isActive: true,
//                 name: namePop,
//                 description: descriptionPop,
//                 amount: amountPop
//             }
//             addServices(newObj);
//         }
//         else if (obj !== "") {
//             console.log("EDIT")
//             console.log(obj._id)
//             let newObj = {
//                 _id: obj._id,
//                 clientId: userId,
//                 isActive: true,
//                 name: namePop,
//                 description: descriptionPop,
//                 amount: amountPop
//             }
//             console.log(newObj)
//             editServices(newObj)
//         }
//         onClose();
//     }
//     useEffect(() => {
//         if (obj !== "") {
//             setNamePop(obj.name)
//             setDescriptionPop(obj.description)
//             setAmountPop(obj.amount)
//         }
//     }, [obj])
//     const onClose = () => {
//         setNamePop("")
//         setDescriptionPop("")
//         setAmountPop("")
//         handleClose()
//     }
//     return (
//         <div>
//             <Dialog open={open} onClose={onClose} fullWidth>
//                 <DialogTitle>Services</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={3} p={2}>
//                         <Grid item xs={12} md={4} >
//                             <TextField
//                                 fullWidth id="outlined-basic" label="Name" variant="outlined"
//                                 value={namePop}
//                                 onChange={(e) => setNamePop(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} >
//                             <TextField
//                                 fullWidth id="outlined-basic" label="description" variant="outlined"
//                                 value={descriptionPop}
//                                 onChange={(e) => setDescriptionPop(e.target.value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 fullWidth id="outlined-basic" label="Amount" variant="outlined"
//                                 value={amountPop}
//                                 onChange={(e) => setAmountPop(e.target.value)}
//                             />
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose}  variant="outlined">Close</Button>
//                     <Button onClick={handleOnSubmit} variant="contained" >Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
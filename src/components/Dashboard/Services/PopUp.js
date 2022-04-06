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
import {
  Autocomplete,
} from "@mui/material";
export default function FormDialog(props) {
  const userId = useSelector((state) => state.user.clientId);
  const { open, handleClose, obj, editServices, addServices } = props;
  const [namePop, setNamePop] = useState("");
  const [descriptionPop, setDescriptionPop] = useState("");
  const [amountPop, setAmountPop] = useState(0);
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("");
  const uom = ["sft",
    "sqm",
    "ft",
    "m",
    "qtr",
    "rft",
    "fts",
    "ft2",
    "BWK",
    "DAY",
    "HYR",
    "HR",
    "MTH",
    "QTR",
    "WK",
    "YR",
    "bag",
    "btl",
    "Box",
    "BKT",
    "cc",
    "can",
    "col",
    "DZ",
    "drm",
    "hp",
    "Job",
    "No.",
    "pkt",
    "par",
    "Pcs",
    "rol",
    "set",
    "ST",
    "Tin",
    "TRK",
    "Tub",
    "BD",
    "Crt",
    "Kit",
    "Brl",
    "CFT",
    "CM",
    "Gal",
    "ltr",
    "lot",
    "ml",
    "pnt",
    "ct",
    "gm",
    "kg",
    "TON"
  ];
  const handleOnSubmit = (e) => {
    if (obj === "") {
      console.log("ADD");
      let newObj = {
        clientId: userId,
        isActive: true,
        name: namePop,
        description: descriptionPop,
        amount: amountPop,
        unit,
        type,
      };
      addServices(newObj);
    } else if (obj !== "") {
      console.log("EDIT");
      console.log(obj._id);
      let newObj = {
        _id: obj._id,
        clientId: userId,
        isActive: true,
        name: namePop,
        description: descriptionPop,
        amount: amountPop,
        unit,
        type,
      };
      console.log(newObj);
      editServices(newObj);
    }
    onClose();
  };
  useEffect(() => {
    if (obj !== "") {
      setNamePop(obj.name);
      setDescriptionPop(obj.description);
      setAmountPop(obj.amount);
    }
  }, [obj]);
  const onClose = () => {
    setNamePop("");
    setDescriptionPop("");
    setAmountPop("");
    setUnit("");
    setType("");
    handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth sx={{ height: '100vh' }}>
        <DialogTitle color={"primary"} sx={{ fontFamily: "PT Sans Narrow" }}>
          Item Creation
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={namePop}
                onChange={(e) => setNamePop(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="description"
                variant="outlined"
                value={descriptionPop}
                onChange={(e) => setDescriptionPop(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                value={amountPop}
                onChange={(e) => setAmountPop(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <MySelect
                label="Unit"
                options={["KG", "KM", "MT"]}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              /> */}
              <Autocomplete
                // disablePortal
                value={unit}
                options={uom}
                onChange={(e, v) => setUnit(v)}
                // getOptionLabel={(option) => option.firstname}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Unit of Measurment"
                  // disabled={isCustomerSelected}
                  />
                )}
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
            {/* <Grid item xs={12} md={4}>
                        <TextField
                                fullWidth id="outlined-basic" label="Tax" variant="outlined"
                                value={amountPop}
                                onChange={(e) => setAmountPop(e.target.value)}
                            />
                        </Grid> */}
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
    </div>
  );
}

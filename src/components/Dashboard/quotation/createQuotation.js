import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Autocomplete,
  Container,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCustomers, createQuotation } from "../../Api/services";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grow from "@mui/material/Grow";

import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import MySelect from "../Select/Select";

const CreateQuotation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");

  // const [customerEmail, setCustomerEmail] = React.useState('')
  // const [customerNumber, setCustomerNumber] = React.useState('')
  // const [customerAddress, setCustomerAddress] = React.useState('')
  const [selectedService, setSelectedService] = React.useState("");
  const [isCustomerSelected, setIsCustomerSelected] = React.useState(false);
  const [subTotalPrice, setSubTotal] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [total, setTotal] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [serviceArr, setServiceArr] = React.useState([]);
  const TAX_RATE = 0.2;

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taxno, setTaxNo] = useState("");
  const [namePrefix, setNamePrefix] = useState("");
  const [customertype, setCustomerType] = useState("");
  const [saveClicked, setSaveClicked] = React.useState(false);
  const [disablefield, setDisableField] = useState(false);
  const { customer, services, user } = useSelector((state) => {
    return {
      customer: state.customer,
      services: state.services,
      user: state.user,
    };
  });
  const handleCustomerSelect = (e, v) => {
    if (v === null) {
      setSelectedCustomer("");
      setCustomerName("");
      setNamePrefix("");
      setFirstName("");
      setLastName("");
      setTaxNo("");
      setCustomerType("");
      setEmail("");
      setOrganization("");
      setPhoneNumber("");
      setAddress("");
      setDisableField(false);
    } else {
      setSelectedCustomer(v);
      setCustomerName(v.name);
      setNamePrefix(v.namePrefix);
      setFirstName(v.firstname);
      setLastName(v.lastname);
      setTaxNo(v.taxno);
      setCustomerType(v.customertype);
      setEmail(v.email);
      setOrganization(v.organization);
      setPhoneNumber(v.phoneNumber);
      setAddress(v.address);
      setDisableField(true);
    }
  };
  const handleCustomerSelected = async () => {
    if (
      selectedCustomer === "" &&
      namePrefix !== "" &&
      firstname !== "" &&
      lastname !== "" &&
      taxno !== "" &&
      customertype !== "" &&
      organization !== "" &&
      email !== "" &&
      address !== "" &&
      phoneNumber !== ""
    ) {
      let newObj = {
        name: customerName,
       
        namePrefix,
        firstname,
        lastname,
        taxno,
        customertype,
        organization,
        email,
        address,
        phoneNumber,

        clientId: user.clientId,
        isActive: true,
      };
      let data = await addCustomer(newObj);
      setIsCustomerSelected(true);
      setDisableField(true);
    } else if (selectedCustomer !== "") {
      setIsCustomerSelected(true)
      setDisableField(true);};
  };
  React.useEffect(() => {
    let amount = subtotal();
    let taxAmount = amount * TAX_RATE;
    let totalAmount = taxAmount + amount;
    setSubTotal(amount);
    setTax(taxAmount);
    setTotal(totalAmount);
    console.log(amount, taxAmount, totalAmount);
    console.log(subTotalPrice, tax, total);
  });

  const addCustomer = async (obj) => {
    const data = await createCustomers(obj);
    if (data !== "Error") {
      console.log(data);
      dispatch({ type: "ADDCUSTOMER", payload: data });
      setSelectedCustomer(data.sucess);
    }
  };
  const handleSelectService = (e, v) => {
    setSelectedService(v);
    setAmount(v.amount);
  };
  const addService = () => {
    if (selectedService !== "" && amount !== "" && qty !== "") {
      if (serviceArr.length > 0) {
        let data = {
          ...selectedService,
          qty,
          total: Number(selectedService.amount) * Number(qty),
        };
        let check = false;
        let newState = serviceArr.map((find) => {
          console.log(find, data, find._id === data._id);
          if (find._id === data._id) {
            find = {
              ...find,
              qty: Number(data.qty) + Number(find.qty),
              total: find.total + data.total,
            };
            check = true;
            return find;
          } else {
            return find;
          }
        });
        console.log(newState);
        if (check) {
          setServiceArr(newState);
        } else {
          setServiceArr([...newState, data]);
        }
        setSelectedService("");
        setAmount("");
        setQty("");
      } else {
        let data = {
          ...selectedService,
          qty,
          total: Number(selectedService.amount) * Number(qty),
        };
        setServiceArr([...serviceArr, data]);
        setSelectedService("");
        setAmount("");
        setQty("");
      }
    }
  };
  const removeService = (index) => {
    setServiceArr(serviceArr.filter((find) => find._id !== index));
  };
  console.log(customer, services, serviceArr);

  const subtotal = () => {
    return serviceArr.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  };

  const handleSave = async () => {
    setSaveClicked(true);
    let data = {
      clientId: user.clientId,
      date: new Date().getTime(),
      customerId: selectedCustomer._id,
      subTotal: subTotalPrice,
      total: total,
      isVAT: true,
      VAT: tax,
      quotationStatus: "pending",
      reciveAmount: 0,
      items: serviceArr,
    };
    console.log('daaaaaaaaaaaaaaaaataaaaaaaaaaaa',data);
    let obj = await createQuotation(data);
    console.log('hamzzzzzzzzzzzzzzzzzzzzzzzzzzz',obj);
    dispatch({ type: "QUOTATIONCREATED", payload: obj.quotation });
    history.push(`/dashboard/quotation/${obj.quotation._id}`);
    setSaveClicked(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, mt: 4, mb: 4, justifyContent: "space-around" }}>
        <Typography sx={{ fontFamily: "PT Sans Narrow", marginBottom:2 }} component="h2" variant="h6" color="primary">
          Select Customer
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              // disableClearable
              // value={selectedCustomer.name || null}
              value={selectedCustomer !== "" ? selectedCustomer : null}
              id="customerSerch"
              options={customer}
              onChange={(e, v) => handleCustomerSelect(e, v)}
              getOptionLabel={(option) => option.firstname}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Customer"
                  disabled={isCustomerSelected}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid
            // fullwidth
            item
            xs={12}
            md={3}
            lg={2}
          >
            <MySelect options={['Mr', 'Mrs', 'Miss', 'M/s']} label={"Mr/Mrs"} 
            value={namePrefix} 
            onChange={(e)=> setNamePrefix(e.target.value) } 
            fullwidth
            disabled={disablefield}
            />
            
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={disablefield}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={5}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              disabled={disablefield}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disablefield}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={disablefield}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Organization"
              variant="outlined"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              disabled={disablefield}
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
              disabled={disablefield}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MySelect
              options={["Individual", "Business"]}
              label={"Type"}
              value={customertype} 
              onChange={(e)=> setCustomerType(e.target.value) }
              disabled={disablefield}
              fullwidth
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={disablefield}
            />
          </Grid>
          {/* <Grid item xs={4}>
                        <TextField
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            id="name"
                            name="name"
                            label="Customer Name"
                            fullWidth
                            disabled={selectedCustomer !== "" ? true : isCustomerSelected}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            id="email"
                            name="email"
                            label="Customer Email"
                            fullWidth
                            disabled={selectedCustomer !== "" ? true : isCustomerSelected}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="number"
                            value={customerNumber}
                            onChange={(e) => setCustomerNumber(e.target.value)}
                            id="customerNumber"
                            name="customerNumber"
                            label="Customer Number"
                            fullWidth
                            disabled={selectedCustomer !== "" ? true : isCustomerSelected}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            id="customerAddress"
                            name="customerAddress"
                            label="Customer Address"
                            fullWidth
                            disabled={selectedCustomer !== "" ? true : isCustomerSelected}
                            multiline
                        />
    </Grid>*/}
          <Grid item xs={10}></Grid>
          <Grid item xs={2} justifyContent="flex-end">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleCustomerSelected}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grow
        in={isCustomerSelected}
        style={{ transformOrigin: "0 0 0" }}
        {...(isCustomerSelected ? { timeout: 1000 } : {})}
      >
        <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
          <Typography component="h2" variant="h6" color="primary">
            Select Services
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={3}>
              <Autocomplete
                value={selectedService !== "" ? selectedService : null}
                disablePortal
                disableClearable
                id="ServiceSerch"
                options={services}
                onChange={(e, v) => handleSelectService(e, v)}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Search Service" />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                name="amount"
                label="Enter Amount"
                fullWidth
                disabled={selectedService !== ""}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                id="qty"
                name="qty"
                label="Quantity"
                fullWidth
                // disabled={selectedCustomer !== ""}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={addService} fullWidth>
                Add
              </Button>
            </Grid>
          </Grid>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell>Qty.</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceArr.map((row, i) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <IconButton onClick={() => removeService(row._id)}>
                        <CloseIcon color="secondary" />
                      </IconButton>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subTotalPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>V.A.T</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{tax}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grow>
      {serviceArr && serviceArr.length > 0 && (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          disabled={saveClicked}
          onClick={handleSave}
        >
          {saveClicked ? <CircularProgress /> : "Save"}
        </Button>
      )}
    </Container>
  );
};

export default CreateQuotation;

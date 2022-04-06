import React, { useEffect, useState } from "react";
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
import FloatingActionButtons from "../FloatingButton/FloatingActionButtons";
import BasicTable from "./../TableList/BasicTable";
import Card from "./../Infocard/CustomerCard";
import { useSelector, useDispatch } from "react-redux";
import {
  createCustomers,
  getCustomers,
  updateCustomers,
} from "../../Api/services";
import Progress from "../Progress/progress";
import FormDialog from "./PopUp";
import Zoom from '@mui/material/Zoom';

const Customers = () => {
  const dispatch = useDispatch();
  const { user, customer } = useSelector((state) => {
    return {
      user: state.user,
      customer: state.customer,
    };
  });
  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [customerObj, setCustomerObj] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    setFilterList(customer);
  }, [customer]);
  useEffect(() => {
    setFilterList(filter !== "" ?
      [...customer.filter(c => c.firstname.toLowerCase().includes(filter.toLowerCase()) || c.lastname.toLowerCase().includes(filter.toLowerCase()))]
      : [...customer]);
  }, [filter]);


  const addCustomer = async (obj) => {
    if (obj !== "") {
      console.log(obj);
      const data = await createCustomers(obj);
      if (data !== "Error") {
        console.log(data);
        dispatch({ type: "ADDCUSTOMER", payload: data });
        setIsAdded(true);
        setCustomerObj("");
      }
    }
  };
  const editCustomer = async (obj) => {
    setDataLoaded(false);
    if (obj !== "") {
      console.log(obj);
      const data = await updateCustomers(obj);
      if (data !== "Error") {
        console.log(data);
        dispatch({ type: "UPDATECUSTOMER", payload: data });
        // setCustomerObj("")
      }
      setTimeout(setDataLoaded(true), 5000);
    }
  };

  const handleEdit = (obj) => {
    setCustomerObj(obj);
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setCustomerObj("");
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers({ clientId: user.clientId });
      console.log("daaaaaaaaaaaaaaaaaaaaaa", data);
      if (data !== "Error") {
        console.log(data, "Customer");
        dispatch({ type: "GETCUSTOMER", payload: data });
      }
      setDataLoaded(true);
      setIsAdded(false);
    };
    fetchData();
  }, []);
  console.log(customer, "customer");
  if (!dataLoaded) return <Progress />;
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container sx={{ width: "100%" }} justifyContent={"space-between"}>
          <Grid item xs={12} md={5} sm={12} lg={5}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
              sx={{ marginTop: 1 }}
              fontFamily="PT Sans Narrow"
            >
              Customers
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TextField
              fullWidth
              label="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Grid>

        </Grid>
        <Grid container pt={2} spacing={3}>
          {filterList.map((data, i) => (
            <Grid item xs={12} md={4} sm={6} lg={4}>
              <Zoom in={true}
                style={{
                  transitionDelay: `${300 * (i + 1)}ms`,
                }}
                unmountOnExit>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    // height: 150,
                  }}
                >
                  <Card
                    customer={data}
                    editCustomer={editCustomer}
                  />
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        <FormDialog
          editCustomer={editCustomer}
          open={open}
          handleClose={handleClose}
          obj={customerObj}
          addCustomer={addCustomer}
        />
        <FloatingActionButtons handleClick={handleClickOpen} />
      </Container>
    </div>
  );
};

export default Customers;

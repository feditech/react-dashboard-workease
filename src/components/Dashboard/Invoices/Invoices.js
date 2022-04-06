import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import TextField from "@mui/material/TextField";
import BasicTable from "../TableList/BasicTable";

import FloatingActionButtons from "../FloatingButton/FloatingActionButtons";
import { useHistory } from "react-router";
import { getCustomers, getProducts, getCompany } from "../../Api/services";
import { useSelector, useDispatch } from "react-redux";
import Progress from "../Progress/progress";
// import CreateCompany from './createComapny';
import { getInvoices, markAsPaid } from "./../../Api/services";
import Card from "../Infocard/InvoiceCard";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Swal from "sweetalert2";
const Invoices = () => {
  const { token, user, invoices } = useSelector((state) => {
    return {
      token: state.asscessToken,
      user: state.user,
      invoices: state.inv,
    };
  });

  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [dateFilter, setDateFilter] = React.useState(new Date());
  useEffect(() => {
    setFilterList(invoices);
  }, [invoices]);

  useEffect(() => {
    setFilterList(
      filter !== ""
        ? [
          ...invoices.filter(
            (s) =>
              s.customerId.firstname
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
              s.customerId.lastname
                .toLowerCase()
                .includes(filter.toLowerCase())
          ),
        ]
        : [...invoices]
    );
  }, [filter]);

  useEffect(() => {
    setFilterList(
      dateFilter !== ""
        ? [
          ...invoices.filter((s) =>
            s
              ? new Date(s.createdAt).toLocaleDateString() ===
              dateFilter.toLocaleDateString()
              : null
          ),
        ]
        : [...invoices]
    );
  }, [dateFilter]);

  // useEffect(() => {
  //   setFilterList(filter !==""?
  //   [... invoices.filter(c => c.lastname.toLowerCase().includes(filter.toLowerCase())) ]
  // :[...invoices]);
  // }, [filter]);

  // console.log(token, user, "USERRRRRRRRRRRRRRRRRRRR");
  const history = useHistory();
  const dispatch = useDispatch();
  // const [allInvoices, setAllInvoices] = useState(invoices);
  const [recievedPayments, setRecievedPayments] = useState(200);
  const [paidInvoices, setPaidInvoices] = useState(20);
  const [totalPayment, setTotalPayment] = useState(1000);
  const [unPaidInvoices, setUnPaidInvoices] = useState(80);
  const [balancePayments, setBalancePayments] = useState(800);
  const [dataLoading, setDataLoading] = useState(false);
  const [viewInv, setViewInv] = useState();
  const [open, setOpen] = useState(false);

  // const [displayCard, setDisplayCard] = useState();

  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompany({ clientId: user.clientId });
      console.log(data);
      if (data !== "Error") {
        console.log(data, "Customer");
        dispatch({ type: "GETCOMPANY", payload: data });
        if (data.length === 0) {
          setOpen(true);
        }
      }
      console.log({ clientId: user.clientId });
      const invData = await getInvoices({ clientId: user.clientId });
      if (invData !== "Error") {
        console.log(invData, "Invoices");

        dispatch({ type: "GETINVOICES", payload: invData });
        // setDisplayCard([
        //     {
        //         name: " All Invoices",
        //         number: invoices.length,
        //     },
        //     {
        //         name: "Paid Invoices",
        //         number: invoices.filter(inv => inv.invoiceStatus === "paid").length,
        //     },
        //     {
        //         name: "Unpaid Invoices",
        //         number: invoices.filter(inv => inv.invoiceStatus !== "paid").length,
        //     },
        //     {
        //         name: "Total Invoices Payment",
        //         number: invoices.reduce((acc, inv) => acc + inv.total, 0),
        //     },
        //     {
        //         name: "Recived Payment",
        //         number: invoices.filter(inv => inv.invoiceStatus === "paid").reduce((acc, inv) => acc + inv.total, 0),
        //     },
        //     {
        //         name: "Balance Payment",
        //         number: invoices.filter(inv => inv.invoiceStatus !== "paid").reduce((acc, inv) => acc + inv.total, 0),
        //     },
        // ])
        // if (invData.length === 0) {
        //     setOpen(true)
        // }
      }
      setDataLoading(true);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers({ clientId: user.clientId });
      console.log(data);
      if (data !== "Error") {
        console.log(data, "Customer");
        dispatch({ type: "GETCUSTOMER", payload: data });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts({ clientId: user.clientId });
      console.log(data);
      if (data !== "Error") {
        dispatch({ type: "GETPRODUCT", payload: data });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const invData = await getInvoices({ clientId: user.clientId });
      if (invData !== "Error") {
        console.log(invData, "Invoices");
        dispatch({ type: "GETINVOICES", payload: invData });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const invData = await getInvoices({ clientId: user.clientId });
      if (invData !== "Error") {
        console.log(invData, "Invoices");

      }
    };
    fetchData();
  }, []);



  const handleView = (obj) => {
    history.push(`/dashboard/invoice/${obj}`);

  };
  const handlePay = async (id) => {
    // history.push(`/dashboard/invoice/${obj}`);
    const check = await markAsPaid({ _id: id })
    if (check !== "Error") {
      dispatch({ type: "MARKASPAID", payload: check });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Invoice Paid'
      })
    }
  };

  const handleChange = (newValue) => {
    setDateFilter(newValue);
    // console.log("newwwwwwwwdassssssssssssss? ",newValue.toLocaleString())
  };
  if (!dataLoading) return <Progress />;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container sx={{ width: "100%" }} justifyContent={"space-between"}>
        <Grid item xs={12} md={12} sm={12} lg={5} sx={{ marginTop: "10px" }}>
          <Typography
            component="h2"
            variant="h6"
            color="secondary"
            gutterBottom
            sx={{ marginTop: 1 }}
            fontFamily="PT Sans Narrow"
          >
            Invoices
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={3} sx={{ marginTop: "10px" }}>
          <TextField
            fullWidth
            label="Search by Customer"
            sx={{ fontFamily: "PT Sans Narrow", color: "text.secondary" }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} sx={{ marginTop: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Search by date"
              inputFormat="MM/dd/yyyy"

              value={dateFilter}
              onChange={handleChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Grid container pt={2} spacing={3}>
        {filterList.map((data, i) => (
          <Grid item xs={12} md={4} sm={6} lg={4}>
            <Zoom
              in={true}
              style={{
                transitionDelay: `${300 * (i + 1)}ms`,
              }}
              unmountOnExit
            >
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  // height: 150,
                  position: "relative",
                }}
              >
                <Card
                  handleView={handleView}
                  handlePay={handlePay}
                  namePrefix={data.customerId.namePrefix}
                  firstname={data.customerId.firstname}
                  lastname={data.customerId.lastname}
                  createdAt={data.createdAt}
                  _id={data._id}
                  invoiceStatus={data.invoiceStatus}
                />
              </Paper>
            </Zoom>
          </Grid>
        ))}
      </Grid>
      {/* <CreateCompany open={open} handleClose={handleClose} /> */}
      <FloatingActionButtons
        handleClick={() => history.push("/dashboard/creatInvoice")}
      />
    </Container>
  );
};

export default Invoices;

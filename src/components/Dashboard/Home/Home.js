import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import BasicTable from "../TableList/BasicTable";
import Card from "../Card/Card";
import FloatingActionButtons from "../FloatingButton/FloatingActionButtons";
import { useHistory } from "react-router";
import { getCustomers, getProducts, getCompany } from "../../Api/services";
import { useSelector, useDispatch } from "react-redux";
import Progress from "../Progress/progress";
import CreateCompany from "./createComapny";
import { getInvoices } from "./../../Api/services";

const Home = () => {
  const { token, user, invoices } = useSelector((state) => {
    return {
      token: state.asscessToken,
      user: state.user,
      invoices: state.inv,
    };
  });
  console.log(token, user);
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
  // const [tableHead] = useState([
  //     {
  //         id: 1,
  //         name: "Sr. No."
  //     },
  //     {
  //         id: 2,
  //         name: "Invoice No"
  //     },
  //     {
  //         id: 3,
  //         name: "Client Name"
  //     },
  //     {
  //         id: 4,
  //         name: "Status"
  //     },
  //     {
  //         id: 5,
  //         name: "Amount"
  //     },
  //     {
  //         id: 6,
  //         name: ""
  //     }
  // ])
  const [displayCard, setDisplayCard] = useState();

  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
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
      }

      setDataLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDisplayCard([
      {
        name: " All Invoices",
        number: invoices ? invoices.length : 0,
      },
      {
        name: "Paid Invoices",
        number: invoices ? invoices.filter(inv => inv && inv.invoiceStatus && inv.invoiceStatus === "paid").length : 0,
      },
      {
        name: "Unpaid Invoices",
        number: invoices
          ? invoices.filter(
            (inv) => inv && inv.invoiceStatus && inv.invoiceStatus !== "paid"
          ).length
          : 0,
      },
      {
        name: "Total Invoices Payment",
        number: invoices
          ? invoices.reduce((acc, inv) => inv && acc + inv.total, 0)
          : 0,
      },
      {
        name: "Received Payment",
        number: invoices
          ? invoices
            .filter((inv) => inv && inv.invoiceStatus === "paid")
            .reduce((acc, inv) => inv && acc + inv.total, 0)
          : 0,
      },
      {
        name: "Balance Payment",
        number: invoices
          ? invoices
            .filter((inv) => inv && inv.invoiceStatus !== "paid")
            .reduce((acc, inv) => inv && acc + inv.total, 0)
          : 0,
      },
    ]);
  }, [invoices])
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
  const handleView = (obj) => {
    history.push(`/dashboard/${user.templetName}/${obj}`);
    // setViewInv(obj)
    // console.log( obj)
  };
  if (dataLoading) return <Progress />;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {displayCard && displayCard.map((data) => (
          <Grid item xs={12} md={4} sm={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                justifyContent: "space-around",
              }}
            >
              <Card name={data.name} number={data.number} />
            </Paper>
          </Grid>
        ))}
        {/* <Grid item xs={12} md={12} lg={12}>
                    <Paper>
                        <BasicTable head={tableHead} data={invoices} handleView={handleView} name='invoices' />
                    </Paper>
                </Grid> */}
      </Grid>
      <CreateCompany open={open} handleClose={handleClose} />
      <FloatingActionButtons
        handleClick={() => history.push("/dashboard/creatInvoice")}
      />
    </Container>
  );
};

export default Home;

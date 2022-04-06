import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import  Typography from '@mui/material/Typography';
import BasicTable from '../TableList/BasicTable';

import FloatingActionButtons from '../FloatingButton/FloatingActionButtons';
import { useHistory } from 'react-router';
import { getCustomers, getProducts, getCompany } from '../../Api/services'
import { useSelector, useDispatch } from 'react-redux';
import Progress from '../Progress/progress'
// import CreateCompany from './createComapny';
import { getInvoices } from './../../Api/services';
import Card from '../Infocard/InvoiceCard'

const Invoices = () => {
    const { token, user, invoices } = useSelector(state => {
        return {
            token: state.asscessToken,
            user: state.user,
            invoices: state.inv
        }
    })
    console.log(token, user)
    const history = useHistory();
    const dispatch = useDispatch()
    // const [allInvoices, setAllInvoices] = useState(invoices);
    const [recievedPayments, setRecievedPayments] = useState(200);
    const [paidInvoices, setPaidInvoices] = useState(20);
    const [totalPayment, setTotalPayment] = useState(1000);
    const [unPaidInvoices, setUnPaidInvoices] = useState(80);
    const [balancePayments, setBalancePayments] = useState(800);
    const [dataLoading, setDataLoading] = useState(false)
    const [viewInv, setViewInv] = useState()
    const [open, setOpen] = useState(false)
    const [tableHead] = useState([
        {
            id: 1,
            name: "Sr. No."
        },
        {
            id: 2,
            name: "Invoice No"
        },
        {
            id: 3,
            name: "Client Name"
        },
        {
            id: 4,
            name: "Status"
        },
        {
            id: 5,
            name: "Amount"
        },
        {
            id: 6,
            name: ""
        }
    ])
    const [displayCard, setDisplayCard] = useState();

    const handleClose = () => setOpen(false)
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCompany({ clientId: user.clientId });
            console.log(data)
            if (data !== "Error") {
                console.log(data, 'Customer')
                dispatch({ type: "GETCOMPANY", payload: data });
                if (data.length === 0) {
                    setOpen(true)
                }
            }
            console.log({ clientId: user.clientId })
            const invData = await getInvoices({ clientId: user.clientId });
            if (invData !== "Error") {
                console.log(invData, 'Invoices')
                dispatch({ type: "GETINVOICES", payload: invData });
                setDisplayCard([
                    {
                        name: " All Invoices",
                        number: invoices.length,
                    },
                    {
                        name: "Paid Invoices",
                        number: invoices.filter(inv => inv.invoiceStatus === "paid").length,
                    },
                    {
                        name: "Unpaid Invoices",
                        number: invoices.filter(inv => inv.invoiceStatus !== "paid").length,
                    },
                    {
                        name: "Total Invoices Payment",
                        number: invoices.reduce((acc, inv) => acc + inv.total, 0),
                    },
                    {
                        name: "Recived Payment",
                        number: invoices.filter(inv => inv.invoiceStatus === "paid").reduce((acc, inv) => acc + inv.total, 0),
                    },
                    {
                        name: "Balance Payment",
                        number: invoices.filter(inv => inv.invoiceStatus !== "paid").reduce((acc, inv) => acc + inv.total, 0),
                    },
                ])
                // if (invData.length === 0) {
                //     setOpen(true)
                // }
            }
            setDataLoading(true)
        };
        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomers({ clientId: user.clientId });
            console.log(data)
            if (data !== "Error") {
                console.log(data, 'Customer')
                dispatch({ type: "GETCUSTOMER", payload: data });
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts({ clientId: user.clientId });
            console.log(data)
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
                console.log(invData, 'Invoices')
                dispatch({ type: "GETINVOICES", payload: invData });
            }
        };
        fetchData();
    }, []);
    const handleView = (obj) => {

        history.push(`/dashboard/${user.templetName}/${obj}`)
        // setViewInv(obj)
        // console.log( obj)
    }
    if (!dataLoading) return <Progress />
    return (
        <Paper
        sx={{
          mt:5,
          p: 2,
          display: "flex",
          flexDirection: "column",
          // height: 150,
        }}
      >
<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
<Typography component="h2" variant="h6" color="primary" gutterBottom>
  Invoices
</Typography>

<Grid container spacing={3}>
  {invoices.map((data) => (
    <Grid item xs={12} md={4} sm={6} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          // height: 150,
        }}
      >
        <Card
         
         total={data.total}
         subTotal={data.subTotal}
         VAT={data.VAT}
          // organization={data.organization}
        createdAt={data.createdAt}
                     
        />
      </Paper>
    </Grid>
  ))}

</Grid>
            {/* <CreateCompany open={open} handleClose={handleClose} /> */}
            <FloatingActionButtons handleClick={() => history.push('/dashboard/creatInvoice')} />
        </Container>
        </Paper>
    )
}

export default Invoices

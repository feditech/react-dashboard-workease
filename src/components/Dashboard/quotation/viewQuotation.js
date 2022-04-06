import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Paper, Divider, Button, Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { getQuotationsById } from "../../Api/services";
import SpanningTable from "./spanningTable";
import "../style/viewInvoice.css";
// import Example from './Downlod';
import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";

const ViewQuotation = () => {
  let location = window.location.hostname.split(":");
  const print = useRef();
  const { template, id } = useParams();
  const [quotation, setQuotation] = useState();
  // console.log(template, id)

  const { inv, company, user } = useSelector((state) => {
    return {
      inv: state.inv,
      company: state.company[0],
      user: state.user,
    };
  });
  // console.log({id: id})
  useEffect(() => {
    const fetchData = async () => {
      // let obj = {
      //     name: "id",
      //     value: id
      // }
      console.log("id", id);
      const data = await getQuotationsById({ id });
      if (data !== "Error") {
        // console.log(data.customerId.name, data.customerId.email, data.customerId.address)
        setQuotation(data);
        console.log(data);
        // console.log(data.message)
        // dispatch({ type: "getQuotationsById", payload: invData });
      }
    };
    fetchData();
  }, []);
  const handlePrint = useReactToPrint({
    content: () => print.current,
  });
  // invoice ? console.log(invoice.customerId.name, invoice.customerId.email, invoice.customerId.address) : []

  // console.log(company, inv, user)
  return (
    <>
      <Container>
        <Grid container spacing={3} sx={{ m: 2 }}>
          <Grid item xs={7}></Grid>
          <Grid item xs={2}>
            <Button variant="contained" fullWidth onClick={handlePrint}>
              Print
            </Button>
          </Grid>
          {/* <Grid item xs={3}>
              <Pdf targetRef={print} fileName={`${id}.pdf`}>
                {({ toPdf }) => (
                  <Button onClick={toPdf} fullWidth variant="contained">
                    Download
                  </Button>
                )}
              </Pdf>
            </Grid> */}
          <Grid item xs={2}>
            <Button fullWidth variant="contained">
              Pay
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Paper sx={{ backgroundColor: "#fff", marginTop: 5 }} ref={print}>
        {" "}
        <Container>
          <Grid
            container
            spacing={3}
            justifyContent={"space-between"}
          >
            {quotation ? (
              <Grid item sx={9} md={8} lg={8}>
                <Typography
                  component="h3"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                  sx={{color:'text.black'}}
                >
                  {company.name}
                </Typography>
                <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                  {company.address}
                </Typography>
                <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                  {company.email}
                </Typography>
                <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                  {company.phoneNumber}
                </Typography>
                <Typography
                  style={{ fontWeight: "bold" }}
                  sx={{ color: "text.black" }}
                  component="p"
                  variant="p"
                >
                  Quotation
                </Typography>

                <Typography
                  style={{ fontWeight: "bold" }}
                  component="p"
                  variant="p"
                  sx={{color:'text.black'}}
                >
                  Submited on {new Date(quotation.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
            ) : (
              []
            )}

            <Grid item sm={2} md={4} lg={4} sx={{display:'flex',flexDirection:'row-reverse'}}>
                <img
                  src={`http://${location[0]}:${2025}/image/${company.logo}`}
                  alt="Logo"
                  style={{ height: 100 }}
                />
            </Grid>


            <Grid item sm={9} md={6} lg={8}>
              <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                Quotation for
              </Typography>

              {quotation ? (
                <div style={{display:"flex",flexDirection:'column'} }>
                  <Typography
                    component="h3"
                    variant="h5"
                    color="primary"
                    style={{ fontWeight: "bold" }}
                    sx={{ color: "text.black" }}
                  >
                    {quotation.customerId.namePrefix}{" "}
                    {quotation.customerId.firstname} {quotation.customerId.lastname}
                  </Typography>
                  <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                    {quotation.customerId.email}
                  </Typography>
                  <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                    {" "}
                    {quotation.customerId.address}
                  </Typography>
                  <Typography component="p" variant="p"   sx={{color:'text.black'}}>
                    {quotation.customerId.phoneNumber}
                  </Typography>
                </div>
              ) : (
                []
              )}
            </Grid>

            <Grid item sm={2} md={6} lg={4}>
              <Grid container spacing={2}>
              <Grid item sm={12} md={4} lg={4}>
                {quotation ? (
                  <>
                    {" "}
                    <Typography
                      component="h5"
                      variant="p"
                     sx={{color:'text.black'}} >
                      Payable to:
                    </Typography>
                  </>
                ) : (
                  []
                )}

                {quotation ? (
                  <>
                    {" "}
                    <Typography
                      component="h5"
                      variant="p"
                     sx={{color:'text.black'}} >
                      Project
                    </Typography>
                  </>
                ) : (
                  []
                )}
              </Grid>
              <Grid item sm={12} md={4 } lg={4}>
                {quotation ? (
                  <>
                    <Typography
                      component="h5"
                      variant="p"
                     sx={{color:'text.black'}} >
                      Quotation#
                    </Typography>
                    <Typography component="h6" variant="p"   sx={{color:'text.black'}}>
                      {quotation._id}
                    </Typography>
                  </>
                ) : (
                  []
                )}

                {quotation ? (
                  <>
                    {" "}
                    <Typography
                      component="h5"
                      variant="p"
                      sx={{color:'text.black'}}  
                    >
                      Due Date:
                    </Typography>
                  </>
                ) : (
                  []
                )}
              </Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ padding: 5 }} sm={12} md={12} lg={12}>
              <SpanningTable sx={{ width: "100%" }} quotation={quotation} />
            </Grid> 
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default ViewQuotation;

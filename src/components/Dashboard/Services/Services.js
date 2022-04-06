import React, { useState, useEffect } from 'react'
import { Typography, Container, Grid, Paper, Autocomplete, TextField, Zoom } from '@mui/material';
import FloatingActionButtons from '../FloatingButton/FloatingActionButtons';
import BasicTable from './../TableList/BasicTable';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createProducts, getProducts, updateProducts } from '../../Api/services';
import Progress from '../Progress/progress'
import FormDialog from './PopUp';
import Card from '../Infocard/ServiceCard'



const Services = () => {
  const dispatch = useDispatch()
  const { user, services } = useSelector((state) => {
    return {
      user: state.user,
      services: state.services
    };
  });

  const [open, setOpen] = React.useState(false);
  const [servicesDataLoaded, setServicesDataLoaded] = useState(false);
  const [servicesObj, setServicesObj] = useState("")
  const [isAdded, setIsAdded] = useState(false)
  const [filter, setFilter] = useState("");
  const [filterList, setFilterList] = useState([])

  useEffect(() => {
    setFilterList(services);
  }, [services]
  )
  useEffect(() => {
    setFilterList(filter !== "" ?
      [...services.filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))] : [...services]
    )
  }, [filter]
  )


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setServicesObj("")
    setOpen(false);
  };
  const addServices = async (obj) => {
    const data = await createProducts(obj);
    if (data !== "Error") {
      console.log(data)
      dispatch({ type: "ADDPRODUCT", payload: data });
      setIsAdded(true)
    }
  }
  const editService = async (obj) => {
    setServicesDataLoaded(false);
    const data = await updateProducts(obj);
    if (data !== "Error") {
      console.log(data)
      dispatch({ type: "UPDATEPRODUCT", payload: data });
    }
    setTimeout(setServicesDataLoaded(true), 5000)
  }
  const handleEdit = (obj) => {
    setServicesObj(obj)
    setOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts({ clientId: user.clientId });
      console.log(data)
      if (data !== "Error") {
        dispatch({ type: "GETPRODUCT", payload: data });
      }
      setServicesDataLoaded(true);
      setIsAdded(false);
    };
    fetchData();
  }, []);



  if (!servicesDataLoaded) return <Progress />
  return (
    <div>

      <Container maxWidth="lg"  sx={{ mt: 4, mb: 4 }}>
        <Grid container sx={{ width: "100%" }} justifyContent={"space-between"}>
          <Grid
            item xs={12} md={5} sm={12} lg={5}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
              sx={{ marginTop: 1 }}
              fontFamily="PT Sans Narrow"

            >
              Services
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
                    service={data}
                    editService={editService}
                  />
                </Paper>
              </Zoom>
            </Grid>
          ))}

        </Grid>
        <FormDialog open={open} handleClose={handleClose} obj={servicesObj} addServices={addServices} />
        <FloatingActionButtons handleClick={handleClickOpen} />
      </Container>

    </div>
  )
}
export default Services


import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LayersIcon from '@mui/icons-material/Layers';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import { useHistory } from 'react-router';


export const MainListItems = ({toggleDrawer}) => {
  const history = useHistory(); 
  return(
  <div>
    <ListItem onClick={() =>{toggleDrawer(); history.push("/dashboard");}} button>
      <ListItemIcon>
        <DashboardIcon color={'primary'} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
   
    <ListItem onClick={() =>{toggleDrawer(); history.push("/dashboard/customers")}} button>
      <ListItemIcon>
        <PeopleIcon color={'primary'} />
      </ListItemIcon >
      <ListItemText color={"text.secondary"} primary="Customers" />
    </ListItem>

    <ListItem onClick={() => {toggleDrawer();history.push("/dashboard/services")}} button>
      <ListItemIcon >
        <BarChartIcon color={'primary'} />
      </ListItemIcon>
      <ListItemText  style={{'color':'primary'}} primary="Services" />
    </ListItem>

    <ListItem onClick={() =>{toggleDrawer(); history.push("/dashboard/invoices")}} button>
      <ListItemIcon>
        <DescriptionIcon color={'primary'} />
      </ListItemIcon>
      <ListItemText primary="Invoices" />
    </ListItem>

    <ListItem onClick={() =>{toggleDrawer(); history.push("/dashboard/quotations")}} button>
      <ListItemIcon>
        <RequestQuoteIcon color={'primary'} />
      </ListItemIcon>
      <ListItemText primary="Quotations" />
    </ListItem>
   
  </div>
);}

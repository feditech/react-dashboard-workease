import { React, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './ListItems/listItems';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import Chart from './Chart';
import { useSelector } from 'react-redux';
import AccountMenu from './ProfileMenu/ProfileMenu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
      },
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
      },

      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.down('sm')]: {
          width: 0,
        },
      }),
    },
  }),
);


function DashboardContent({ children }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user)
  // console.log(user)

  const { isSignIn } = useSelector((state) => {
    return {
      isSignIn: state.isSignIn,
    };
  });


  const toggleDrawer = () => {
    setOpen(!open);
  };
  const toggleCloseDrawer = () => {
    if (open) setOpen(!open)
  }

  console.log(isSignIn)
  if (isSignIn == false) return <Redirect to="/signin" />

  return (
    // <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="secondary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="secondary"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          // onClick={toggleDrawer}
          // sx={{
          //   marginRight: '36px',
          //   ...(open && { display: 'none' }),
          // }}
          >
            <NotificationsIcon color='secondary' />
          </IconButton>
          <IconButton color="inherit">
            <Badge color="secondary">
              {/* <NotificationsIcon /> */}
              {/* <LetterAvatars /> */}
              <AccountMenu />

            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon color='primary' />
          </IconButton>
        </Toolbar>
        <Divider />
        <List><MainListItems toggleDrawer={toggleCloseDrawer} /></List>
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <Box color="default">
          <Container color="default">
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
    // </ThemeProvider>
  );
}

export default DashboardContent;
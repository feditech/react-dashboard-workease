import React from 'react'
import {
  Avatar, Button, CssBaseline, createTheme,
  ThemeProvider,
  TextField, FormControlLabel, Checkbox, Link, Grid, Box, Container, Typography, Alert, Card
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Redirect, useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { signin } from '../../Api/services';
import AlertDialogSlide from '../DialogPopUp/DialogPopUp';
import Swal from 'sweetalert2'

const theme = createTheme({
  // Theme settings
  palette: {
    type: "light",
    primary: {
      main: "#fbc86c",
    },
    secondary: {
      main: "#c38206",
    },
    text: {
      primary: "#333",
      secondary: "#333",
      disabled: "#808080",
      hint: "rgba(255, 255, 255, 0.5)",
      icon: "#fbc86c",
      black: '#333',
      color2: '#333'
    },
    background: {
      paper: "#f3f3f3",
      default: "#fffff",
    },
  },
});

const SignIn = () => {
  var history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginCliked, setIsLoginClicked] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [loginMsg, setLoginMsg] = React.useState("");



  const [errorMassage, setErrorMassage] = React.useState(false);
  const { isSignIn } = useSelector((state) => {
    return {
      isSignIn: state.isSignIn,
    };
  });
  React.useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(!isError);
        setIsLoginClicked(!isLoginCliked);
      }, 3000);
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      setIsLoginClicked(!isLoginCliked);
      // console.log(isLoginCliked)
      let signInData = { email, password };
      // console.log(signInData)
      const data = await signin(signInData);

      if (
        data !== "Error"
        &&
        data.message !== "Email and Password Not Matched"
      ) {
        setIsError(data.message)
        // console.log("user", data.message);
        if (data.message === "Matched") {
          //  console.log("Log In")
          dispatch({
            type: "SIGNIN",
            payload:
              data
          })
          Swal.fire({
            icon: 'success',
            title:'success',
            text:'User Signin Successful'
          })

        } else {
          setErrorMassage(data.message);
          console.log(errorMassage)
        }
        // if (data.user.compId.length === 1 && data.user.branchId.length === 1) {
        //   const comp = await getCompanyById({ id: data.user.compId[0] });
        //   const branch = await getBranchById({ id: data.user.branchId[0] });
        //   dispatch({
        //     type: "LOGINWITHSELECTEDCOMPBRANCH",
        //     payload: {
        //       data,
        //       comp,
        //       branch,
        //     }, 
        //   });
        // } else {
        //   console.log(data.user.compId.lenght, data.user.branchId.lenght);
        //   console.log(data.user.compId.length, data.user.branchId.length);
        // }
        // dispatch({ type: "LOGIN", payload: data });
      } else {
        setIsError(true);
        // setErrorMassage("505 Network Error Contact to Administrator");
        // console.log(data.message)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMassage
        })
      }
      // console.log(data);
      setIsLoginClicked(!isLoginCliked);
    }
  };
  // console.log(isSignIn)
  if (isSignIn) return <Redirect to="/dashboard" />


  return (
    // <div>


    <ThemeProvider theme={theme} >
      <Box sx={{
        background: `url('https://assets-global.website-files.com/5fe5e8091a273864309d3463/6017dfe70b6e1e02865eb7f0_VAT-Invoice-Fonoa-Invoicing.jpg')`,
        backgroundColor: "black",
        boxShadow: 'inset 0 0 0 2000px rgb(207, 183, 15 ,0.3)',
        width: "100%", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh'
      }}>

        <Container component="main" maxWidth="xs" sx={{ paddingTop: 4 }}>
          {/* <CssBaseline /> */}

          <Card sx={{
            // marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 5,
            boxShadow: "0px 0px 2px 0px #f6b30d "
          }}>
            <Avatar sx={{ m: 1, bgcolor: '#fbc86c' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ color: 'text.primary' }} component="p" variant="h5">
              Sign in
            </Typography>
            {/* onSubmit={handleSubmit} */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmit}
                //disabled={isLoginCliked}


                sx={{ mt: 3, mb: 2 }}
              >
                {/* {isLoginCliked ? (
                    <CircularProgress color="secondary" />
                    ) : (
                      "Sign In"
                    )} */}
                sign in
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => history.push("./signup")} >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link onClick={() => history.push("/signup")} href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent={'space-around'}>
                <Grid item sx={{ m: 3 }}>
                  <Typography sx={{}} component="p" variant="p">
                    Powered by {" "}
                    <Link href='https://iotsol.pk/' target='_blank' variant="body2" >
                      IoTSol.pk </Link>
                  </Typography>


                </Grid>
              </Grid>
            </Box>
          </Card>
          {/* 
          {isError ?  <Alert severity="error">{errorMassage}</Alert> : null} */}
        </Container>
      </Box>
    </ThemeProvider>
    // </div>
  );



}

export default SignIn;

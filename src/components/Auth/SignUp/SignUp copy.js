import { React, useState } from 'react'
import { useHistory, Redirect } from "react-router-dom";
import {
  Avatar, Button, CssBaseline, createTheme,
  ThemeProvider, TextField, FormControlLabel, Checkbox, Link,
  Grid, Box, Typography, Container, Dialog, Card,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signup } from './../../Api/services';
import AlertDialogSlide from '../DialogPopUp/DialogPopUp';
import { useSelector } from 'react-redux';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



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
const SignUp = () => {
  var history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [emailAddressError, setemailAddressError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const [open, setOpen] = useState(false);
  const { isSignIn } = useSelector((state) => {
    return {
      isSignIn: state.isSignIn,
    };
  });

  const handleClose = () => {
    setOpen(false)
    history.push("/signIn")
  };
  // const [phoneNumber, setPhoneNumber] = useState(0);
  // const [companyName, setCompanyName] = useState("");
  // const [desigination, setDesigniation] = useState("");
  // const [address, setAddress] = useState("");


  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     // eslint-disable-next-line no-console
  //     console.log({
  //       emailAddress: data.get('emailAddress'),
  //       password: data.get('password'),
  //     });
  const ValidateemailAddress = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  // const checkName = ()=>{
  //   if()
  // } 

  const CheckPassword = (password) => {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (password.match(passw)) {
      return true;
    }
    else {
      return false;
    }
  }
  const ConfirmPasswordCheck = () => {
    if (password === confirmPassword) {
      setConfirmPasswordError("Matched")
    }
    else {
      setConfirmPasswordError("Not Matched")
    }
  }
  const PasswordCheck = () => {
    if (CheckPassword(password)) {
      setPasswordError("Strong")
      ConfirmPasswordCheck();
    }
    else {
      setPasswordError("Weak")
    }
  }
  const emailAddressCheck = () => {
    if (ValidateemailAddress(emailAddress)) {
      setemailAddressError("")
      PasswordCheck();
    }
    else {
      setemailAddressError("Invalid email Address ")
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    emailAddressCheck();
    console.log(emailAddress)
    // console.log(ValidateemailAddress(emailAddress))
    if (ValidateemailAddress(emailAddress)) {
      if (firstName !== "" && lastName !== "" && emailAddress !== "" && password !== "" && confirmPassword !== "") {
        let name = firstName + " " + lastName
        let email = emailAddress.toLowerCase()
        let confirmPass = confirmPassword;
        let SignUpData = { name, email, password, confirmPass };
        console.log(SignUpData)
        const data = await signup(SignUpData);
        if (data !== "Error") {
          setOpen(true);
          setSubmitMsg(data.message)
          console.log(data.message);
        }
      }
    }


  }
  console.log(isSignIn)
  if (isSignIn) return <Redirect to="/dashboard" />
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box sx={{
          background: `url('https://assets-global.website-files.com/5fe5e8091a273864309d3463/6017dfe70b6e1e02865eb7f0_VAT-Invoice-Fonoa-Invoicing.jpg')`,
          backgroundColor: "black",
          boxShadow: 'inset 0 0 0 2000px rgb(207, 183, 15 ,0.3)',
          width: "100%",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          p: 0

        }}>



          <Container component="main" maxWidth="xs"  sx={{ padding: 5 }} >
            <CssBaseline />
            <Card sx={{
              // marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              boxShadow: "0px 0px 2px 0px #f6b30d "
            }}>
              <Avatar sx={{ m: 1, bgcolor: '#fbc86c' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography sx={{ color: 'text.primary' }} component="p" variant="h5">
                Sign up
              </Typography>

              <Box component="form" onSubmit={submit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={firstName}
                      autoFocus
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}

                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="emailAddress"
                      label="Email Address"
                      name="emailAddress"
                      helperText={emailAddressError}
                      // helperText={emailAddressError ? "(emailAddress shoud be in lower case ) e.g (user@gmail.com)" : null}
                      autoComplete="emailAddress"
                      value={emailAddress}
                      onChange={(e) => {
                        setemailAddress(e.target.value)
                        // ValidateemailAddress(e.target.value);
                        emailAddressCheck(e.target.value);
                      }}


                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      helperText={passwordError}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        PasswordCheck()
                      }}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmassword"
                      helperText={confirmPasswordError}
                      // helperText={confirmPasswordError ? confirmPasswordError : null}
                      autoComplete="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        ConfirmPasswordCheck()
                      }}

                    />
                  </Grid>
                  {/* phone Number
          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  autoComplete="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="desigination"
                  label="Desigination"
                  name="desigination"
                  autoComplete="desigination"
                  value={desigination}
                  onChange={(e) => setDesigniation(e.target.value)}

                />
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}

                />
              </Grid> */}

                  {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraemailAddresss" color="primary" />}
                    label="I accepted all terms and conditions"
                  />
                </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

                <AlertDialogSlide open={open} handleClose={handleClose} submitMsg={submitMsg} />
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={() => history.push("/signin")} href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>

              {/* <Copyright sx={{ mt: 5 }} /> */}
              <Grid container spacing={2} justifyContent={'space-around'}>
                <Grid item sx={{ m: 1 }}>
                  <Typography sx={{}} component="p" variant="p">
                    Powered by {" "}
                    <Link href='https://iotsol.pk/' target='_blank' variant="body2" >
                      IoTSol.pk </Link>
                  </Typography>


                </Grid>
              </Grid>
            </Card>
          </Container>
        </Box>
      </ThemeProvider>



    </Box>
  )
}

export default SignUp;

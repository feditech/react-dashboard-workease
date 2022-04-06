import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Redirect, useHistory } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Card,
  ThemeProvider,
  createTheme,
  Container,
  FormControlLabel,
  Grid,
  Checkbox,
  Avatar,
  Typography,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { LoadingButton } from '@mui/lab';
// 
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------
import { signup } from './../../Api/services';
import { useSelector } from 'react-redux';
export default function RegisterForm() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPasswordC, setShowPasswordC] = useState(false);
  const { isSignIn } = useSelector((state) => {
    return {
      isSignIn: state.isSignIn,
    };
  });
  console.log(isSignIn)
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



  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required(
      'Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    confirmPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {


      let obj = {
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
        confirmPass: values.confirmPassword,

      }
      if (obj.password !== obj.confirmPass) {
        console.log("Password and Confirm Password must match")
        setMsg("Password and Confirm Password must match")
        return

      } else {
        const data = await signup(obj);
        if (data !== "Error") {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: 'User Registered Successful'
          })
          setTimeout(() => {
            history.push("/signIn")
          }, 800);
        }
      }
    }

  });
  React.useEffect(() => {
    if (msg !== "") {
      setTimeout(() => setMsg(""), 3000);
    }
  }, [msg])

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  if (isSignIn) return <Redirect to="/dashboard" />
  return (
    <FormikProvider value={formik}>
      <ThemeProvider theme={theme}>
        <Box sx={{
          background: `url('https://assets-global.website-files.com/5fe5e8091a273864309d3463/6017dfe70b6e1e02865eb7f0_VAT-Invoice-Fonoa-Invoicing.jpg')`,
          backgroundColor: "black",
          boxShadow: 'inset 0 0 0 2000px rgb(207, 183, 15 ,0.3)',
          width: "100%",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',

          height: '100%'

        }}>
          <Container component="main" maxWidth="xs"

            sx={{ padding: 2 }}


          >

            <Card maxWidth="xs" sx={{
              // marginTop: 5,
              // backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              boxShadow: "0px 0px 2px 0px #f6b30d "
            }}>
              <Box sx={{ paddingBottom: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

                <Avatar sx={{ m: 1, bgcolor: '#fbc86c' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography sx={{ color: 'text.primary' }} component="p" variant="h5">
                  Sign Up
                </Typography>
              </Box>

              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="First name"
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />

                    <TextField
                      fullWidth
                      label="Last name"
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  {/* <TextField
                    error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                    fullWidth
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    label="Mobile"
                    name="mobile"
                    onBlur={formik.handleBlur}
                    {...getFieldProps('mobile')}
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    type="number"
                  /> */}



                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                            <Icon icon={showPassword ? AiFillEye : AiFillEyeInvisible} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="ConfirmPassword"
                    {...getFieldProps('confirmPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowPasswordC((prev) => !prev)}>
                            <Icon icon={showPasswordC ? AiFillEye : AiFillEyeInvisible} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraemailAddresss" color="primary" />}
                      label="I accepted all terms and conditions"
                    />
                  </Grid>


                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Register
                  </LoadingButton>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link onClick={() => history.push("/signin")} href="#" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>



                </Stack>
              </Form>
            </Card>
          </Container>
        </Box>
      </ThemeProvider>
    </FormikProvider >
  );
}
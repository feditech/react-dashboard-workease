import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';


import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Redirect, useHistory } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// 
import Swal from 'sweetalert2';
// ___________
import { v4 as uuid } from 'uuid';
import axios from 'axios';
axios.defaults.withCredentials = true;
// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPasswordC, setShowPasswordC] = useState(false);





  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().min(8, 'Too Short!').max(11, 'Too Long!').required('mobile is required'),
    AddressLocation: Yup.string().min(8, 'Too Short!').required('mobile is required'),
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
      mobile: '',
      password: '',
      confirmPassword: '',
      AddressLocation: '',
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const uid = uuid();

      let obj = {
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
        AddressLocation: values.AddressLocation,
        mobile: values.mobile.toString(),
        userType: "user",
        userName: uid,
        confirmPassword: values.confirmPassword,

      }
      if (obj.password !== obj.confirmPassword) {
        console.log("Password and Confirm Password must match")
        setMsg("Password and Confirm Password must match")
        return

      } else {
        console.log("config ")
        const config = {
          method: "post",
          url: `/signup`,
          // `${process.env.REACT_APP_API_URL}/signup`,
          withCredentials: true,
          data: obj,
        }
        console.log("axios ")
        await axios(config).then(res => {
          if (res.data.message === "Email has been send to your account. Kindly verify your Account") {
            history.push("/Login")
            Swal.fire(
              'Register',
              'Email has been send to your account. Kindly verify your Account',
              'success'
            )
          } else {
            console.log(res)
            setMsg(res.data.message)
          }
        }).catch(err => console.log(err))
        console.log("end ")
        // const config = {
        //   method: "post",
        //   url: 'http://localhost:4000/api/signup',
        //   withCredentials: true,
        //   data: obj,
        // }
        await axios(config)
          .then(res => {
            console.log(res)
            if (res.data.message === "User create successfully.") {
              history.push("/signin")
              // navigate('/dashboard'}
            } else {
              console.log(res)
              // setMsg(res.data.message)
            }
          }).catch(err => console.log(err))
      }
    }

  });
  React.useEffect(() => {
    if (msg !== "") {
      setTimeout(() => setMsg(""), 3000);
    }
  }, [msg])

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
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

          <TextField
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
          />

          <TextField
            error={Boolean(formik.touched.AddressLocation && formik.errors.AddressLocation)}
            fullWidth
            helperText={formik.touched.AddressLocation && formik.errors.AddressLocation}
            label="Address"
            name="AddressLocation"
            onBlur={formik.handleBlur}
            {...getFieldProps('AddressLocation')}
            onChange={formik.handleChange}
            value={formik.values.AddressLocation}
            type="text"
          />

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



          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
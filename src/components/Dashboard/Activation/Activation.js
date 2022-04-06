import React from 'react'
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';


import { useParams, useHistory, Redirect } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { activate } from '../../Api/services'


const Activation = () => {
  let { id } = useParams()
  const history = useHistory()
  let [isClicked, setIsClicked] = React.useState(false);
  let [isActivated, setIsActivated] = React.useState(false)
  const handleActivate = async () => {
    setIsClicked(true)
    const promise = await activate({ id: id })
    if (promise.message) {
      if (promise.message === "Account Activated") {
        setIsActivated(true)
        setTimeout(() => {
          history.push('/signin')
        }, 1000)
      }

    }
    setIsClicked(true)
  }
  if (!id) return <Redirect to="/signin" />
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "25%" }}>
      <Button onClick={handleActivate} color={isActivated ? "success" : "primary"} disabled={isActivated} variant="contained">
        {isClicked === false ? "Activate Your Account" : isActivated ? "Your Account has been activated" : <CircularProgress />}
      </Button>
    </Box>
  );
}

export default Activation;

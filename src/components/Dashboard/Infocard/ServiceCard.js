import React, { useState } from "react";
import Typography from "@mui/material/Typography";


import FormDialog from "../Services/editServices";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export default function Deposits(props) {
  const [open, setOpen] = useState(false)

  const {
    service,
    editService
  } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div style={{ height: '135px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

        <div>
          <div style={{display: 'flex'}}>
            <Typography component="h3" variant="p" color={"secondary"}       >
              {service.name}
            </Typography>
            <IconButton style={{margin:'0 8px', padding:0}} onClick={handleClickOpen}>
              <EditIcon color='primary' />
            </IconButton>

          </div>
          <Typography
            component="p"
            variant="p"
            color={"text.secondary"}
            //  overflow={'hidden'}
            //  textOverflow={'ellipsis'}
            //  display={'webkit-box'}
            noWrap={'false'}
            width={'90%'}

          >
            {service.description}
          </Typography>


        </div>

        <div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >
              Type:{"  "}{" "}
            </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {service.type}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >
              Amount:{"  "}{" "}
            </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {service.amount}
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Typography sx={{ 'marginRight': 1 }} component="p" variant="p"       >
              Unit:{"  "}{" "}
            </Typography>
            <Typography component="p" variant="p" color={"text.secondary"}>
              {service.unit}
            </Typography>
          </div>
        </div>
        <FormDialog
          editService={editService}
          open={open}
          handleClose={handleClose}
          service={service}
        />

      </div>
    </React.Fragment>
  );
}

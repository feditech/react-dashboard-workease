import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


export default function FloatingActionButtons(props) {
  const classes = useStyles(props);
  // const theme = useTheme();
  const { handleClick } = props
  return (
    // <Box style={{ position: "absolute", bottom: " spacing(2)", right: "spacing(2)" }} sx={{ '& > :not(style)': { m: 2 } }}>
    <Zoom
      in={true}
      style={{
        transitionDelay: `500ms`,
      }}
      unmountOnExit
    >
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=>{handleClick()}}>
        <AddIcon />
      </Fab>
    </Zoom>
    // </Box>
  );
}
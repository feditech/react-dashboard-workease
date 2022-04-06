import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import FormDialog from './ResetPassPopup';

export default function AccountMenu() {
    const [openPopUp, setOpenPopUp] = React.useState(false);
    const { isSignIn } = useSelector((state) => {
        return {
            isSignIn: state.isSignIn,
        };
    });
    const userName = useSelector((state) => state.user.name)
    
    let str = userName ? userName : "Guest"
    let upperStr = str.toUpperCase()
    let firstChar = upperStr.charAt(0)
    console.log(firstChar);
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpen = () => {
        setOpenPopUp(true);
    };

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    };
    const handleLogOut = () => {
        // window.location.reload();
        let dataSignIn = false;
        dispatch({
            type: "SIGNOUT"
        })
        console.log(isSignIn)
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>{firstChar}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => history.push("/dashboard/profile")} >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        {upperStr}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => history.push("/dashboard/profile")} >
                    Profile
                </MenuItem>

                <MenuItem onClick={handleClickOpen}>
                    Reset Password
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut} >
                    <ListItemIcon   >
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <FormDialog open={openPopUp} handleClose={handleClosePopUp} />
        </React.Fragment>
    );
}
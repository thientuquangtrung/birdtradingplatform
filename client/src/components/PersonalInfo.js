import { Logout, Person, Receipt } from '@mui/icons-material';
import { Divider, ListItemIcon, MenuItem, MenuList, Paper } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function PersonalInfo() {
    const { setCurrentUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setCurrentUser(null);
        enqueueSnackbar('Logout! Please log in for better experience.', { variant: 'warning' });
    };

    return (
        <Paper elevation={3}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    Tài khoản của tôi
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Receipt fontSize="small" />
                    </ListItemIcon>
                    Đơn mua
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default PersonalInfo;

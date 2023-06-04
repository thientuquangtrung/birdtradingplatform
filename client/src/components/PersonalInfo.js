import { Logout, Person, Receipt } from '@mui/icons-material';
import { Divider, ListItemIcon, MenuItem, MenuList, Paper } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function PersonalInfo() {
    const { setCurrentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setCurrentUser(null);
        navigate('/');
        enqueueSnackbar('Logout! Please log in for better experience.', { variant: 'warning' });
    };

    return (
        <Paper elevation={3}>
            <MenuList>
                <Link to="/profile">
                    <MenuItem>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Tài khoản của tôi
                    </MenuItem>
                </Link>
                <Link to={'/orders'}>
                    <MenuItem>
                        <ListItemIcon>
                            <Receipt fontSize="small" />
                        </ListItemIcon>
                        Đơn mua
                    </MenuItem>
                </Link>
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

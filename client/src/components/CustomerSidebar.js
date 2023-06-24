import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Lock } from '@mui/icons-material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';

function CustomerSidebar() {
    return (
        <List sx={{ paddingTop: 5, width: '250px' }}>
            <Link to={'/profile'}>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonPinIcon></PersonPinIcon>
                    </ListItemIcon>
                    <ListItemText primary="Tài khoản của tôi " />
                </ListItemButton>
            </Link>
            <Link to="/password/verify">
                <ListItemButton>
                    <ListItemIcon>
                        <Lock></Lock>
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>
            </Link>
            <Link to="/orders">
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingBagIcon></ShoppingBagIcon>
                    </ListItemIcon>
                    <ListItemText primary="Đơn mua" />
                </ListItemButton>
            </Link>
        </List>
    );
}

export default CustomerSidebar;

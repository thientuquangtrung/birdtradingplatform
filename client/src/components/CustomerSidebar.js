import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Receipt, ShoppingBasket, Store, TrendingUp, Lock } from '@mui/icons-material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';

function CustomerSidebar() {
    return (
        <List sx={{ paddingTop: 5 }}>
            <Link>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonPinIcon></PersonPinIcon>
                    </ListItemIcon>
                    <ListItemText primary="Tài khoản của tôi " />
                </ListItemButton>
            </Link>
            <Link to="/product/list/all">
                <ListItemButton>
                    <ListItemIcon>
                        <Lock></Lock>
                    </ListItemIcon>
                    <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>
            </Link>
            <Link to="/shop/profile">
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

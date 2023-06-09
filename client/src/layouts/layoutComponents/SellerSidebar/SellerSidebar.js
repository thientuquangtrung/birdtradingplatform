import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Receipt, ShoppingBasket, Store, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function SellerSidebar() {
    return (
        <List sx={{ paddingTop: 5 }}>
            <Link>
                <ListItemButton>
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí đơn hàng" />
                </ListItemButton>
            </Link>
            <Link to="/product/list/all">
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí sản phẩm" />
                </ListItemButton>
            </Link>
            <Link to="/dashboard">
                <ListItemButton>
                    <ListItemIcon>
                        <TrendingUp />
                    </ListItemIcon>
                    <ListItemText primary="Dữ liệu" />
                </ListItemButton>
            </Link>
            <Link to="/profile">
                <ListItemButton>
                    <ListItemIcon>
                        <Store />
                    </ListItemIcon>
                    <ListItemText primary="Quản lí shop" />
                </ListItemButton>
            </Link>
        </List>
    );
}

export default SellerSidebar;

import { Logout, Person, Receipt } from "@mui/icons-material";
import { Divider, ListItemIcon, MenuItem, MenuList, Paper } from "@mui/material";

function PersonalInfo() {
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
                <MenuItem>
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

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Drafts, ExpandLess, ExpandMore, Inbox, Send, StarBorder } from '@mui/icons-material';
import { useState } from 'react';

function SellerSidebar() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItemButton>
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

export default SellerSidebar;

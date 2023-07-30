import NotificationsIcon from '@mui/icons-material/Notifications';
import Notification from '../components/Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import Tippy from '@tippyjs/react/headless';
import { useContext, useRef } from 'react';
import { Badge, Box, IconButton, Stack, Typography } from '@mui/material';

function NotificationHandle() {
    const notificationRef = useRef();
    const { notificationLength } = useContext(NotificationContext);
    function notificationsLabel(count) {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 99) {
            return 'more than 99 notifications';
        }
        return `${count} notifications`;
    }

    return (
        <Tippy
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <Box tabIndex="-1" {...attrs}>
                    <Notification />
                </Box>
            )}
        >
            <Stack direction="row" alignItems="center" ref={notificationRef}>
                <IconButton aria-label={notificationsLabel(notificationLength)}>
                    <Badge badgeContent={notificationLength} color="success">
                        <NotificationsIcon sx={{ color: 'white' }} />
                    </Badge>
                </IconButton>
                <Typography fontSize={14} sx={{ cursor: 'pointer' }}>
                    Thông báo
                </Typography>
            </Stack>
        </Tippy>
    );
}

export default NotificationHandle;

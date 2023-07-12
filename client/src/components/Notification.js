import { Box, Button, MenuList, Paper, Stack, Typography } from '@mui/material';
import NotificationItem from './NotificationItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

function Notification() {
    const { notificationList } = useContext(NotificationContext);

    return (
        <Paper>
            <Stack width={'350px'} height={'400px'} sx={{ overflowY: 'scroll' }}>
                <Box marginTop={2}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                        {notificationList.length > 0 ? 'Thông báo' : 'Chưa có thông báo'}
                    </Typography>
                </Box>
                {notificationList.length > 0 ? (
                    <MenuList>
                        {notificationList.map((notification) => (
                            <NotificationItem key={notification.date} data={notification} />
                        ))}
                    </MenuList>
                ) : (
                    <img
                        style={{ width: '80%', margin: '20px auto' }}
                        src="assets/images/Notification.png"
                        alt="notification"
                    />
                )}
            </Stack>
        </Paper>
    );
}

export default Notification;

import { Box, Button, MenuList, Paper, Stack, Typography } from '@mui/material';
import NotificationItem from './NotificationItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

function Notification() {
    const notificationList = [];

    return (
        <Paper>
            <Stack gap={2} width={'350px'} height={'400px'} sx={{ overflowY: 'scroll' }}>
                <Box marginTop={2}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                        {notificationList.length > 0 ? 'Thông báo' : 'Chưa có thông báo'}
                    </Typography>
                </Box>
                { notificationList.length > 0 ? (
                    <>
                        <MenuList mb={1}>
                            {/* {notificationList.slice(0, 5).map((item) => {
                                return (
                                    <Link to={`/product/detail/${item.product.name}`} state={{ id: item.product.id }}>
                                        <NotificationItem key={item.product.id} data={item.product} />
                                    </Link>
                                );
                            })} */}
                            <NotificationItem isRead />
                            <NotificationItem />
                            <NotificationItem isRead />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                        </MenuList>
                        {/* <Stack direction={'row'} justifyContent={'flex-end'}>
                            <Link to="/cart">
                                <Button variant="contained" color="primary">
                                    Xem giỏ hàng
                                </Button>
                            </Link>
                        </Stack> */}
                    </>
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

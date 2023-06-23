import { MenuItem, Typography, Stack } from '@mui/material';

function NotificationItem({ isRead = false }) {
    return (
        <MenuItem
            sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: isRead ? '#fff' : '#e3f2fd',
                // height: '60px',
            }}
        >
            <Stack direction="column" gap={0.5}>
                <Typography
                    maxWidth={400}
                    noWrap
                    textOverflow={'ellipsis'}
                    textAlign={'start'}
                    flex={1}
                    fontSize={16}
                    variant="subtitle2"
                    component="p"
                >
                    {/* {data.name} */}
                    Chim cảnh
                </Typography>
                <Typography
                    maxWidth={300}
                    noWrap
                    textOverflow={'ellipsis'}
                    textAlign={'start'}
                    flex={1}
                    // variant="subtitle2"
                    component="p"
                >
                    {/* {data.name} */}
                    Là loài chim đẹp nhất Việt Nam
                </Typography>
                <Typography variant="body1" component="span" color="#bdbdbd" fontSize={12} fontStyle="italic">
                    {/* {data.price} */}
                    11:14
                </Typography>
            </Stack>
        </MenuItem>
    );
}

export default NotificationItem;

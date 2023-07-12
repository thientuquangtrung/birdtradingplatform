import { MenuItem, Typography, Stack } from '@mui/material';
import dayjs from 'dayjs';

function NotificationItem({ data }) {
    return (
        <MenuItem
            sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: data.isRead ? '#fff' : '#e3f2fd',
                // height: '60px',
            }}
        >
            <Stack direction="column" gap={0.5}>
                <Stack direction="row" alignItems={'center'} justifyContent="space-between">
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
                        {data.title}
                    </Typography>
                    <Typography variant="body1" component="span" color="#bdbdbd" fontSize={12} fontStyle="italic">
                        {dayjs(data.date).format('DD/MM/YYYY H:mm A')}
                    </Typography>
                </Stack>
                <Typography
                    maxWidth={300}
                    noWrap
                    textOverflow={'ellipsis'}
                    textAlign={'start'}
                    flex={1}
                    // variant="subtitle2"
                    component="p"
                >
                    {data.content}
                </Typography>
            </Stack>
        </MenuItem>
    );
}

export default NotificationItem;

import React from 'react';
import { Typography, MenuItem } from '@mui/material';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useFetchRecipientUser } from '../hooks/useFetchRecipient';

    function UserChat({chat, user}) {
    const {recipientUser} = useFetchRecipientUser(chat, user)

    console.log(recipientUser)
    return (
        <MenuItem>
            <Stack direction="row" gap={1} alignItems="center">
                <Avatar
                    alt="Remy Sharp"
                    src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                    sx={{ width: 32, height: 32 }}
                />
                <Stack direction="column">
                    <Stack direction="row" gap={1} justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="h6"
                            fontSize={14}
                            sx={{
                                maxWidth: 'calc(100% - 50px)',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {recipientUser.name}
                        </Typography>
                        <Typography color="#666" fontSize={10}>
                            11:14
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body2"
                        fontSize={12}
                        sx={{
                            maxWidth: 'calc(100% - 5px)',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        Có rất nhiều mã giảm giá
                    </Typography>
                </Stack>
            </Stack>
        </MenuItem>
    );
}

export default UserChat;

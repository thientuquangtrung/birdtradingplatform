import React, { useState } from 'react';

import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Link } from 'react-router-dom';

const PasswordVerify = () => {
    const avatarStyle = { backgroundColor: '#1E90FF' };
    const [password, setPassword] = useState('');
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Paper
            sx={{
                minHeight: '680px',
                typography: 'body1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid container direction="column" justifyContent="center" alignItems="center" marginBottom="30px">
                <h1 style={{ fontWeight: '450' }}>Xác minh tài khoản</h1>
                <Avatar style={avatarStyle}>
                    <DoneOutlineIcon />
                </Avatar>
            </Grid>
            <Paper sx={{ minHeight: '300px', borderRadius: '15px', display: 'flex', alignItems: 'center' }}>
                <Stack direction="column" width="600px" justifyContent="center" alignItems="center" gap="20px">
                    <Typography textAlign="center" variant="h5">
                        Nhập mật khẩu BTP
                    </Typography>
                    <TextField
                        onChange={handleChangePassword}
                        value={password}
                        variant="outlined"
                        placeholder="Nhập mật khẩu hiện tại để xác minh"
                        type="password"
                        sx={{ width: '400px' }}
                    />
                    <Button variant="contained">
                        <Link to="/password/change" variant="contained">
                            Xác nhận
                        </Link>
                    </Button>
                </Stack>
            </Paper>
        </Paper>
    );
};

export default PasswordVerify;

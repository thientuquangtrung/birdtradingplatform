import React, { useContext, useState } from 'react';

import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';

const PasswordVerify = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const avatarStyle = { backgroundColor: '#1E90FF' };
    const [password, setPassword] = useState('');
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        axiosClient
            .put('/auth/verify_password', {
                id: currentUser.id,
                oldPassword: password,
            })
            .then((response) => {
                // Handle the API response if needed
                const secretToken = response.data.data;
                navigate('/password/change', {
                    state: {
                        secretToken,
                    },
                });
                enqueueSnackbar('Xác minh mật khẩu thành công', { variant: 'success' });
            })
            .catch((error) => {
                // Handle the API error if needed
                console.log(error);
            });
    };

    return (
        <Paper
            sx={{
                minHeight: '700px',
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
                        onKeyDown={handlePress}
                        onChange={handleChangePassword}
                        value={password}
                        variant="outlined"
                        placeholder="Nhập mật khẩu hiện tại để xác minh"
                        type="password"
                        sx={{ width: '400px' }}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Xác nhận
                    </Button>
                </Stack>
            </Paper>
        </Paper>
    );
};

export default PasswordVerify;

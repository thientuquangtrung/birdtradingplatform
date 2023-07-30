import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
const PasswordReset = () => {
    const navigate = useNavigate();
    const avatarStyle = { backgroundColor: '#1E90FF' };

    const [email, setEmail] = useState('');
    const handlePress = (event) => {
        if (event.value === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };
    const isDisabled = () => {
        return !email;
    };
    const handleSubmit = (email) => {
        axiosClient
            .post('password/email', { email })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                handleError(error);
            });
        // navigate('/login');
        enqueueSnackbar('Xác nhận đã gửi. Vui lòng check email !', { variant: 'success' });
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
            {' '}
            <Grid container direction="column" justifyContent="center" alignItems="center" marginBottom="30px">
                <h1 style={{ fontWeight: '450' }}>Đặt lại mật khẩu</h1>
                <Avatar style={avatarStyle}></Avatar>
            </Grid>
            <Paper sx={{ minHeight: '300px', borderRadius: '15px', display: 'flex', alignItems: 'center' }}>
                <Stack direction="column" width="600px" justifyContent="center" alignItems="center" gap="20px">
                    <Typography textAlign="center" variant="h5">
                        Nhập email để xác minh
                    </Typography>
                    <TextField
                        onKeyDown={handlePress}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        variant="outlined"
                        placeholder="Email"
                        type="text"
                        sx={{ width: '400px' }}
                    />
                    <Button
                        disabled={isDisabled()}
                        sx={{
                            '&:disabled': {
                                backgroundColor: 'rgb(58 152 140 / 45%)',
                            },
                            backgroundColor: '#43a99c',
                            '&:hover': { backgroundColor: '#43a99c' },
                        }}
                        variant="contained"
                        onClick={() => {
                            handleSubmit(email);
                        }}
                    >
                        Xác nhận
                    </Button>
                </Stack>
            </Paper>
        </Paper>
    );
};

export default PasswordReset;

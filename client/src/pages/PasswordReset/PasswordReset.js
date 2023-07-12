import React, { useContext, useState } from 'react';
import SubCustomerLayout from '../../layouts/SubCustomerLayout/SubCustomerLayout';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axiosClient from '../../api/axiosClient';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import LockResetIcon from '@mui/icons-material/LockReset';

const PasswordReset = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const avatarStyle = { backgroundColor: '#1E90FF' };
    const location = useLocation();
    const { email } = useParams();
    const handleSubmit = () => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (password === confirmPassword) {
            setError('');
            axiosClient
                .put('password/reset', {
                    email,
                    token,
                    password,
                })
                .then((response) => {
                    console.log(response);
                    // Handle successful password reset
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                    // Handle error
                });
        } else {
            setError('Mật khẩu không giống nhau');
        }
    };

    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };
    const isDisabled = () => {
        return password === '' || confirmPassword === '';
    };
    return (
        <Paper
            sx={{
                minHeight: '700px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Stack sx={{ margin: '20px auto' }}>
                <Typography variant="h4" fontWeight="400" style={{ textDecoration: 'none' }}>
                    Đổi mật khẩu mới
                </Typography>
                <Stack margin="0 auto">
                    <Avatar style={avatarStyle}>
                        <LockResetIcon></LockResetIcon>
                    </Avatar>
                </Stack>
            </Stack>
            <Stack sx={{ margin: '50px auto', alignItems: 'center', justifyContent: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h6" width="210px" fontWeight="400">
                        Mật khẩu mới:
                    </Typography>
                    <TextField
                        onKeyDown={handlePress}
                        size="small"
                        type="password"
                        value={password}
                        error={!!error}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" width="210px" fontWeight="400">
                        Xác nhận mật khẩu:
                    </Typography>
                    <TextField
                        onKeyDown={handlePress}
                        size="small"
                        type="password"
                        value={confirmPassword}
                        error={!!error}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && (
                    <Typography variant="body2" color="error" style={{ marginTop: '20px' }}>
                        {error}
                    </Typography>
                )}
            </Stack>
            <Grid align="center">
                <Button
                    sx={{
                        width: '110px',
                        height: '36px',
                        '&:disabled': {
                            backgroundColor: 'rgb(58 152 140 / 45%)',
                        },
                        backgroundColor: '#43a99c',
                        '&:hover': { backgroundColor: '#43a99c' },
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isDisabled()}
                >
                    Xác nhận
                </Button>
            </Grid>
        </Paper>
    );
};

export default PasswordReset;

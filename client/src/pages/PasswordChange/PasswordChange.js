import React, { useContext, useState } from 'react';
import SubCustomerLayout from '../../layouts/SubCustomerLayout/SubCustomerLayout';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axiosClient from '../../api/axiosClient';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';

const PasswordChange = () => {
    const location = useLocation();
    const secretToken = location.state.secretToken;
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };
    const isDisabled = () => {
        return !password || !confirmPassword;
    };
    const handleSubmit = () => {
        axiosClient
            .put('/auth/change_password', {
                id: currentUser.id,
                secretToken: secretToken,
                newPassword: password,
                confirmPassword: confirmPassword,
            })
            .then((response) => {
                navigate('/profile');
                enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
            })
            .catch((error) => console.log(error));
    };

    return (
        <SubCustomerLayout>
            <Paper
                sx={{
                    minHeight: '700px',
                    width: '100%',
                }}
            >
                <Stack borderBottom="1px solid " marginBottom="30px" sx={{ margin: '30px' }}>
                    <Typography variant="h4" fontWeight="400">
                        Đổi mật khẩu
                    </Typography>
                    <Typography variant="h6" fontWeight="350">
                        {' '}
                        Để bảo mật tài khoản vui lòng không chia sẻ cho người khác
                    </Typography>
                </Stack>
                <Stack sx={{ margin: '100px 30px 30px 30px', alignItems: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6" width="210px" fontWeight="400">
                            Mật khẩu mới :
                        </Typography>
                        <TextField
                            onKeyDown={handlePress}
                            size="small"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" width="210px" fontWeight="400">
                            Xác nhận mật khẩu :
                        </Typography>
                        <TextField
                            onKeyDown={handlePress}
                            size="small"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
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
        </SubCustomerLayout>
    );
};

export default PasswordChange;

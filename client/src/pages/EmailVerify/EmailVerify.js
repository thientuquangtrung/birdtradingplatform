import { Button, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import axiosClient from '../../api/axiosClient';
import { enqueueSnackbar } from 'notistack';
const EmailVerify = () => {
    const paperStyle = {
        padding: 20,
        width: 600,
        margin: '20px auto',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        fontWeight: '450',
    };
    const mailformat = /^[a-zA-Z0-9_.+-]+@(gmail\.com|fpt\.edu\.vn)$/;
    const [email, setEmail] = useState('');
    const [validationMsg, setValidationMsg] = useState('');
    const [error, setError] = useState('');
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const validateAll = () => {
        const msg = {};
        if (!mailformat.test(email)) {
            msg.email = 'Email không hợp lệ!';
        }
        setValidationMsg(msg);
        return Object.keys(msg).length === 0;
    };

    const handleSubmit = () => {
        if (validateAll()) {
            axiosClient
                .post('otp/generate', { email })
                .then((response) => {
                    enqueueSnackbar('OTP đã được gửi vui lòng kiểm tra email', { variant: 'info' });
                    navigate('/otp/verify', { state: { email } });
                })
                .catch((error) => {
                    console.log(error);
                    setError('Email đã được sử dụng');
                });
        }
    };

    const isButtonDisabled = !email.trim();
    const navigate = useNavigate();
    return (
        <Paper elevation={20} style={paperStyle}>
            <img style={{ width: '70px', marginTop: '-50px' }} src="/assets/images/images.png"></img>
            <Stack direction="column" gap="20px">
                <Stack marginBottom="5px">
                    <h2 style={{ margin: '0 auto' }}>Đăng ký</h2>
                </Stack>
                <PersonPinIcon></PersonPinIcon>
                <Stack direction="column" width="400px" alignItems="flex-start">
                    <TextField
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        label="Email"
                        type="email"
                        onKeyDown={handlePress}
                        error={!!validationMsg.email}
                        helperText={validationMsg.email} // Show validation error message
                    />
                    {error &&
                        !validationMsg.email && ( // Show error message when email is already used
                            <Typography
                                style={{
                                    color: 'red',
                                    fontSize: '13px',
                                    marginLeft: '10px',
                                }}
                            >
                                {error}
                            </Typography>
                        )}
                    <Button
                        disabled={isButtonDisabled}
                        sx={{
                            '&:disabled': {
                                backgroundColor: isButtonDisabled ? 'lightblue' : 'blue',
                            },
                            marginTop: '10px',
                        }}
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Tiếp theo
                    </Button>
                </Stack>
                <Typography style={{ margin: '20px 0 0 0', textAlign: 'center' }}>
                    Đã có tài khoản?{' '}
                    <Link style={{ color: 'blue' }} to="/login">
                        Đăng nhập
                    </Link>
                </Typography>
            </Stack>
        </Paper>
    );
};

export default EmailVerify;

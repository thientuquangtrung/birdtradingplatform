import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const OtpVerify = () => {
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

    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Update the array length to 6
    const [validationMsg, setValidationMsg] = useState('');
    const inputRefs = useRef([]);

    const handleOtpKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            if (index > 0 && !otp[index]) {
                const previousInput = inputRefs.current[index - 1];
                if (previousInput) {
                    previousInput.focus();
                }
            } else if (index >= 0 && otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = ''; // Clear the digit at the current index
                setOtp(newOtp);
                const previousInput = inputRefs.current[index - 1];
                if (previousInput) {
                    previousInput.focus();
                }
            }
        } else if (event.key >= '0' && event.key <= '9' && index < 6) {
            const newOtp = [...otp];
            newOtp[index] = event.key;
            setOtp(newOtp);
            const nextIndex = Math.min(index + 1, 5); // Calculate the next index, but not exceeding the last index
            const nextInput = inputRefs.current[nextIndex];
            if (nextInput) {
                nextInput.focus();
            }
        } else if (event.key === 'ArrowRight') {
            const nextIndex = Math.min(index + 1, 5); // Calculate the next index, but not exceeding the last index
            const nextInput = inputRefs.current[nextIndex];
            if (nextInput) {
                nextInput.focus();
            }
        } else if (event.key === 'ArrowLeft') {
            const previousIndex = Math.max(index - 1, 0); // Calculate the previous index, but not going below 0
            const previousInput = inputRefs.current[previousIndex];
            if (previousInput) {
                previousInput.focus();
            }
        }
    };
    const navigate = useNavigate();
    const handleSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            // Perform validation and submit logic with the OTP value
            navigate('/signup');
        } else {
            setValidationMsg({ otp: 'Please enter a valid OTP.' });
        }
    };
    return (
        <Paper elevation={20} style={paperStyle}>
            <Stack direction="column" gap="5px">
                <Stack marginBottom="20px">
                    <h1 style={{ margin: '0 auto' }}>Nhập Mã OTP</h1>
                </Stack>
                <Stack sx={{ margin: '0 auto' }} justifyContent="center" alignContent="center">
                    <Grid width="300px" align="center">
                        <img width="35px" height="35px" src="/assets/images/mailLogo.png" alt="Mail Logo" />
                    </Grid>
                    <Typography style={{ margin: '10px auto' }}>Kiểm tra email để nhập OTP</Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    {otp.map((digit, index) => (
                        <TextField
                            variant="standard"
                            sx={{ margin: '0 5px', width: '60px' }}
                            key={index}
                            id={`otp-input-${index}`}
                            value={digit}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center' },
                            }}
                            size="small"
                            error={!!validationMsg.otp}
                            inputRef={(ref) => (inputRefs.current[index] = ref)}
                            autoFocus={index === 0}
                        />
                    ))}
                </Stack>
                {validationMsg.otp && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.otp}
                    </Typography>
                )}
                <Button
                    disabled={!otp.every((digit) => digit !== '') || validationMsg.otp}
                    sx={{
                        marginTop: '20px',
                        '&:disabled': {
                            backgroundColor: !otp.every((digit) => digit !== '') ? 'lightblue' : 'blue',
                        },
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Xác thực
                </Button>
            </Stack>
        </Paper>
    );
};

export default OtpVerify;

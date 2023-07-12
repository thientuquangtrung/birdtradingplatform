import React, { useContext, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';

const Signup = ({ role = 'customer' }) => {
    const paperStyle = { padding: 20, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue', width: '50px', height: '50px' };
    const marginStyle = { margin: '10px 0' };

    const { setCurrentUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const location = useLocation();
    const email = location.state?.email;

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const phoneformat = /(0[3|5|7|8|9])([0-9]{8})\b/;

    const [validationMsg, setValidationMsg] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        if (!email) {
            navigate('/email/verify');
        }
    }, [email, navigate]);

    useEffect(() => {
        setIsButtonDisabled(
            !name.trim() || !phone.trim() || !address.trim() || !password.trim() || !confirmPassword.trim(),
        );
    }, [name, phone, address, password, confirmPassword]);

    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };
    const codeStyle = {
        padding: '6px 4px',
        borderRadius: '10px',
        transition: 'background-color 0.3s ease',
    };

    const validateAll = () => {
        const msg = {};
        if (!name.trim()) {
            msg.name = 'Vui lòng nhập họ và tên!';
        }
        // if (!email.trim()) {
        //     msg.email = 'Vui lòng nhập email!';
        // }
        // } else if (!mailformat.test(email)) {
        //     msg.email = 'Email không hợp lệ!';
        // }
        if (!phone.trim()) {
            msg.phone = 'Vui lòng nhập số điện thoại!';
        } else if (!phoneformat.test(phone)) {
            msg.phone = 'Số điện thoại không hợp lệ!';
        }
        if (!address.trim()) {
            msg.address = 'Vui lòng nhập địa chỉ!';
        }
        if (!password.trim()) {
            msg.password = 'Vui lòng nhập mật khẩu!';
        }
        if (!confirmPassword.trim()) {
            msg.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
        } else if (password !== confirmPassword) {
            msg.confirmPassword = 'Mật khẩu không khớp!';
        }
        setValidationMsg(msg);
        return Object.keys(msg).length === 0;
    };

    const handleSubmit = () => {
        const payload = {
            email: email,
            name: name,
            password: password,
            phone: phone,
        };

        if (role === 'customer') {
            payload.shipToAddress = address;
        } else if (role === 'seller') {
            payload.pickUpAddress = address;
        }

        const isValidAll = validateAll();

        if (isValidAll) {
            axiosClient
                .post(`auth/${role ? role : 'customer'}/register`, payload)
                .then(function (response) {
                    localStorage.setItem('access_token', response.data.meta.accessToken);
                    localStorage.setItem('refresh_token', response.data.meta.refreshToken);
                    setCurrentUser(response.data.data);
                    navigate('/');
                    enqueueSnackbar('Welcome to BTP! Get your first order now.', { variant: 'info' });
                })
                .catch(function (error) {
                    setError('Email đã tồn tại ! Vui lòng kiểm tra lại thông tin.');
                    console.log(error);
                });
        }
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={{ margin: '5px 0 0  0' }}>Thiết Lập Tài Khoản</h2>
                </Grid>
                <PersonIcon />
                <TextField
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                    fullWidth
                    label="Họ & Tên"
                    onKeyDown={handlePress}
                    error={!!validationMsg.name}
                />
                {validationMsg.name && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.name}
                    </Typography>
                )}

                <TextField
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={marginStyle}
                    fullWidth
                    label="Số điện thoại"
                    onKeyDown={handlePress}
                    error={!!validationMsg.phone}
                />
                {validationMsg.phone && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.phone}
                    </Typography>
                )}
                <TextField
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={marginStyle}
                    fullWidth
                    label="Địa chỉ"
                    onKeyDown={handlePress}
                    error={!!validationMsg.address}
                />
                {validationMsg.address && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.address}
                    </Typography>
                )}
                <TextField
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={marginStyle}
                    name="psw1"
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    onKeyDown={handlePress}
                    error={!!validationMsg.password}
                />
                {validationMsg.password && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.password}
                    </Typography>
                )}
                <TextField
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={marginStyle}
                    name="psw2"
                    fullWidth
                    label="Nhập lại mật khẩu"
                    type="password"
                    onKeyDown={handlePress}
                    error={!!validationMsg.confirmPassword}
                />
                {validationMsg.confirmPassword && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.confirmPassword}
                    </Typography>
                )}
                <Button
                    disabled={isButtonDisabled}
                    sx={{
                        '&:disabled': {
                            backgroundColor: isButtonDisabled ? 'rgb(58 152 140 / 45%)' : '#43a99c',
                        },
                        backgroundColor: '#43a99c',
                        '&:hover': { backgroundColor: '#43a99c' },
                    }}
                    style={codeStyle}
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Đăng ký
                </Button>
                <Typography style={{ color: 'red', fontSize: '13px', margin: '5px 0 10px 0' }}>{error}</Typography>
                <Typography style={marginStyle}>
                    Đã có tài khoản?{' '}
                    <Link style={{ color: 'rgb(3 143 125)' }} to="/login">
                        Đăng nhập
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Signup;

import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const Signup = () => {
    const paperStyle = { padding: 20, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue' };
    const marginStyle = { margin: '10px 0' };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickUpAddress, setPickUpAdress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    function handleChangeName(event) {
        setName(event.target.value);
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangePhone(event) {
        setPhone(event.target.value);
    }
    function handleChangeAddress(event) {
        setPickUpAdress(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    function handleChangeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }
    function handleSubmit() {
        axiosClient
            .post('auth/seller/register', {
                email: email,
                name: name,
                password: password,
                pickUpAddress: pickUpAddress,
                phone: phone,
            })
            .then(function (response) {
                localStorage.setItem('access_token', response.data.meta.accessToken);
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const codeStyle = {
        backgroundColor: '#00CED1',
        padding: '6px 4px',
        borderRadius: '10px',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '##FF1493',
        },
    };

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <h1>Đăng kí</h1>
                    <Typography variant="caption">Vui lòng điền đầy đủ thông tin !</Typography>
                </Grid>
                <PersonIcon></PersonIcon>{' '}
                <TextField
                    value={name}
                    onChange={handleChangeName}
                    style={{ marginBottom: '10px' }}
                    fullWidth
                    label="Họ & Tên"
                ></TextField>
                <TextField
                    value={email}
                    onChange={handleChangeEmail}
                    style={marginStyle}
                    fullWidth
                    label="Email"
                    type="email"
                ></TextField>
                <TextField
                    value={phone}
                    onChange={handleChangePhone}
                    style={marginStyle}
                    fullWidth
                    label="Số điện thoại"
                ></TextField>
                <TextField
                    value={pickUpAddress}
                    onChange={handleChangeAddress}
                    style={marginStyle}
                    fullWidth
                    label="Địa chỉ"
                ></TextField>
                <TextField
                    value={password}
                    onChange={handleChangePassword}
                    style={marginStyle}
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                ></TextField>
                <TextField
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    style={marginStyle}
                    fullWidth
                    label="Nhập lại mật khẩu"
                    type="password"
                ></TextField>
                <Button style={codeStyle} fullWidth type="submit" variant="contained" onClick={handleSubmit}>
                    Đăng kí
                </Button>
                <Typography style={marginStyle}>
                    Đã có tài khoản?{' '}
                    <Link style={{ color: 'blue' }} to="/login">
                        Sign In
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Signup;

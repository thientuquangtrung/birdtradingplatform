import React, { useContext, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
import AuthContext from '../../contexts/AuthContext';

const Signup = () => {
    const paperStyle = { padding: 20, width: 600, height: '88vh', margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue' };
    const marginStyle = { margin: '10px 0' };

    const { setCurrentUser } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const mailformat = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    const phoneformat = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

    const [validationMsg, setValidationMsg] = useState('');
    const [messsage, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn sự kiện mặc định của phím Enter
            handleSubmit(); // Gọi hàm handleSubmit để thực hiện đăng nhập
        }
    };

    function isEmpty(str) {
        return !str || str.length === 0;
    }

    const validateAll = () => {
        const msg = {};
        if (
            isEmpty(name) ||
            isEmpty(email) ||
            isEmpty(phone) ||
            isEmpty(pickUpAddress) ||
            isEmpty(password) ||
            isEmpty(confirmPassword)
        ) {
            msg.email = 'Vui lòng nhập đầy đủ thông tin !';
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const validateElement = () => {
        const message = {};
        if (!mailformat.test(email)) {
            message.email = 'Nhập sai định dạng email';
        }
        if (!phoneformat.test(phone)) {
            message.phone = 'Nhập sai định dạng số điện thoại';
        }
        if (password !== confirmPassword) {
            message.confirmPassword = 'Mật khẩu không khớp';
        }
        setMessage(message);
        if (Object.keys(message).length > 0) return false;
        return true;
    };

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
        setPickUpAddress(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    function handleChangeConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }
  
    const handleSubmit = () => {
        const isValidAll = validateAll();
        const isValidElement = validateElement();
        if (isValidAll && isValidElement) {
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
                setCurrentUser(response.data.data);

                    navigate('/');
                })
                .catch(function (error) {
                    setError('Email đã tồn tại ! Vui lòng kiểm tra lại thông tin.');
                    console.log(error);
                });
        }
    };

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
                    <h1 style={{ margin: '0' }}>Đăng ký</h1>
                    {/* <Typography variant="caption">Vui lòng điền vào form này !</Typography> */}
                </Grid>
                <PersonIcon></PersonIcon>{' '}
                <TextField
                    value={name}
                    onChange={handleChangeName}
                    style={{ marginBottom: '10px' }}
                    fullWidth
                    label="Họ & Tên"
                    onKeyDown={handlePress}
                ></TextField>
                <TextField
                    value={email}
                    onChange={handleChangeEmail}
                    style={marginStyle}
                    fullWidth
                    label="Email"
                    type="email"
                    onKeyDown={handlePress}
                ></TextField>
                <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>{messsage.email}</Typography>
                <TextField
                    value={phone}
                    onChange={handleChangePhone}
                    style={marginStyle}
                    fullWidth
                    label="Số điện thoại"
                    onKeyDown={handlePress}
                ></TextField>
                <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>{messsage.phone}</Typography>
                <TextField
                    value={pickUpAddress}
                    onChange={handleChangeAddress}
                    style={marginStyle}
                    fullWidth
                    label="Địa chỉ"
                    onKeyDown={handlePress}
                ></TextField>
                <TextField
                    value={password}
                    onChange={handleChangePassword}
                    style={marginStyle}
                    name="psw1"
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    onKeyDown={handlePress}
                ></TextField>
                <TextField
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    style={marginStyle}
                    name="psw2"
                    fullWidth
                    label="Nhập lại mật khẩu"
                    type="password"
                    onKeyDown={handlePress}
                ></TextField>
                <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                    {messsage.confirmPassword}
                </Typography>
                <Button style={codeStyle} fullWidth type="submit" variant="contained" onClick={handleSubmit}>
                    Đăng ký
                </Button>
                <Typography style={{ color: 'red', fontSize: '13px', margin: '5px 0 0 10px' }}>
                    {validationMsg.email}
                </Typography>
                <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>{error}</Typography>
                <Typography style={marginStyle}>
                    Đã có tài khoản?{' '}
                    <Link style={{ color: 'blue' }} to="/login">
                        Đăng nhập
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Signup;

import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useSnackbar } from 'notistack';
import AuthContext from '../../contexts/AuthContext';

const Login = ({ role }) => {
    // Destructure the handleChange prop

    const paperStyle = { padding: 20, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue' };
    const marginStyle = { margin: '10px 0' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setCurrentUser } = useContext(AuthContext);
    const [validationMsg, setValidationMsg] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [deleteReason, setDeleteReason] = useState('');

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    function isEmpty(str) {
        return !str || str.length === 0;
    }
    const validateAll = () => {
        const msg = {};
        if (isEmpty(email) || isEmpty(password)) {
            msg.email = 'Vui lòng nhập lại tài khoản hoặc mật khẩu !';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn sự kiện mặc định của phím Enter
            handleSubmit(); // Gọi hàm handleSubmit để thực hiện đăng nhập
        }
    };

    const handleSubmit = () => {
        const isValid = validateAll();
        if (isValid) {
            axiosClient
                .post(`auth/${role ? role : 'customer'}/login`, {
                    email: email,
                    password: password,
                })
                .then(function (response) {
                    localStorage.setItem('access_token', response.data.meta.accessToken);
                    localStorage.setItem('refresh_token', response.data.meta.refreshToken);
                    setCurrentUser(response.data.data);
                    enqueueSnackbar('Welcome back!', { variant: 'info' });

                    if (searchParams.get('redirectTo')) {
                        return navigate(-1);
                    } else {
                        navigate('/');
                    }
                })
                .catch(function (error) {
                    setError('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.data &&
                        error.response.data.data.deleteReason
                    ) {
                        setDeleteReason(error.response.data.data.deleteReason);
                    }
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Grid>
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOpenIcon />
                        </Avatar>
                        <h2>Đăng nhập</h2>
                    </Grid>
                    <PersonIcon></PersonIcon>{' '}
                    <TextField
                        value={email}
                        onChange={handleChangeEmail}
                        style={marginStyle}
                        label="Tên đăng nhập"
                        fullWidth
                        required
                        onKeyDown={handlePress}
                    />
                    <TextField
                        value={password}
                        onChange={handleChangePassword}
                        style={marginStyle}
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        required
                        onKeyDown={handlePress}
                    />
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.email}
                    </Typography>
                    {error && (
                        <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>{error}</Typography>
                    )}
                    {deleteReason && (
                        <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                            {deleteReason}
                        </Typography>
                    )}
                    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
                        <Typography style={marginStyle}>
                            <Link href="#">Quên mật khẩu ?</Link>
                        </Typography>
                    </Grid>
                    <Button id="btn" variant="contained" type="button" color="primary" fullWidth onClick={handleSubmit}>
                        Đăng nhập
                    </Button>
                    <Typography style={marginStyle}>
                        Bạn đã có tài khoản ?{' '}
                        <Link style={{ color: 'blue' }} to="/signup">
                            Đăng ký
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;

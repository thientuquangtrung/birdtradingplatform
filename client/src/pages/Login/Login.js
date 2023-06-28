import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useSnackbar } from 'notistack';
import AuthContext from '../../contexts/AuthContext';

const Login = ({ role }) => {
    // Destructure the handleChange prop

    const paperStyle = { padding: 20, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue', width: '50px', height: '50px' };
    const marginStyle = { margin: '10px 0' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setCurrentUser } = useContext(AuthContext);
    const [validationMsg, setValidationMsg] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState('');
    const [errorCheck, setErrorCheck] = useState(false);
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }
    function isEmpty(str) {
        return !str || str.length === 0;
    }
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(isEmpty(email) || isEmpty(password));
    }, [email, password]);

    const validateAll = () => {
        const msg = {};
        if (isEmpty(email) || isEmpty(password)) {
            msg.email = 'Vui lòng nhập lại tài khoản hoặc mật khẩu !';
            setErrorCheck(true);
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
                    navigate('/');
                })
                .catch(function (error) {
                    setErrorCheck(true);
                    setError('Đăng nhập thất bại ! Vui lòng kiểm tra lại thông tin.');
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
                        error={errorCheck}
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
                        error={errorCheck}
                    />
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {validationMsg.email}
                    </Typography>
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>{error}</Typography>
                    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
                        <Typography style={marginStyle}>
                            <Link to="/password/forget">
                                <Button>Quên mật khẩu ?</Button>
                            </Link>
                        </Typography>
                    </Grid>
                    <Button
                        disabled={isButtonDisabled}
                        id="btn"
                        variant="contained"
                        type="button"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            '&:disabled': {
                                backgroundColor: isButtonDisabled ? 'lightblue' : 'blue',
                            },
                        }}
                    >
                        Đăng nhập
                    </Button>
                    <Typography style={marginStyle}>
                        Bạn đã có tài khoản ?{' '}
                        <Link style={{ color: 'blue' }} to="/email/verify">
                            Đăng ký
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;

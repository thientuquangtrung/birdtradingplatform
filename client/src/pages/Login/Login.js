import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const Login = () => {
    // Destructure the handleChange prop
    const paperStyle = { padding: 20, width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue' };
    const marginStyle = { margin: '10px 0' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        axiosClient
            .post('auth/seller/login', {
                email: email,
                password: password,
            })
            .then(function (response) {
                localStorage.setItem('access_token', response.data.meta.accessToken);
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Grid>
                <Paper elevation={5} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOpenIcon />
                        </Avatar>
                        <h1>Sign In</h1>
                    </Grid>
                    <PersonIcon></PersonIcon>{' '}
                    <TextField
                        value={email}
                        onChange={handleChangeEmail}
                        style={marginStyle}
                        label="Email"
                        placeholder="Enter username"
                        fullWidth
                        required
                    />
                    <TextField
                        value={password}
                        onChange={handleChangePassword}
                        style={marginStyle}
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        fullWidth
                        required
                    />
                    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember password" />
                        <Typography style={marginStyle}>
                            <Link href="#">Forgot password ?</Link>
                        </Typography>
                    </Grid>
                    <Button variant="contained" type="submit" color="primary" fullWidth onClick={handleSubmit}>
                        Sign In
                    </Button>
                    <Typography style={marginStyle}>
                        Do you have an account?{' '}
                        <Link to="/signup" style={{color: 'Highlight'}}>
                            Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;

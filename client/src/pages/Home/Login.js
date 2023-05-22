import React from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';

const Login = ({ handleChange }) => {
    // Destructure the handleChange prop
    const paperStyle = { padding: 20, height: '66vh', width: 600, margin: '20px auto' };
    const avatarStyle = { backgroundColor: 'lightblue' };
    const marginStyle = { margin: '10px 0' };

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
                    <TextField style={marginStyle} label="Email" placeholder="Enter username" fullWidth required />
                    <TextField
                        style={marginStyle}
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        fullWidth
                        required
                    />
                    <Grid style={{display:"flex", justifyContent:"space-between"}}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember password" />
                        <Typography style={marginStyle}>
                            <Link href="#">Forgot password ?</Link>
                        </Typography>
                    </Grid>
                    <Button variant="contained" type="submit" color="primary" fullWidth>
                        Sign In
                    </Button>
                    <Typography>
                        Do you have an account ?
                        <Link href="#" onClick={() => handleChange('event', 1)}>
                            Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;

import React from 'react'
import Grid from '@mui/material/Grid';
import { Avatar, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Login = () => {
    const paperStyle={padding: 20, height: '70vh',width:600,margin:"20px auto"}
    const avatarStyle={backgroundColor:"lightblue"}
    const marginStyle={margin:"10px 0"}
  return (
    <div>
        <Grid>
            <Paper elevation={5} style={paperStyle}>
            <Grid align="center"> 
                <Avatar style={avatarStyle}><LockOpenIcon></LockOpenIcon></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <TextField style={marginStyle} label="Username" placeholder='Enter username' fullWidth required></TextField>
            <TextField style={marginStyle} label="Password" type='password' placeholder='Enter password' fullWidth required></TextField>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember password" />
            <Button variant='contained' type="submit" color='primary' fullWidth> Sign In</Button>
            <Typography style={marginStyle}>
                <Link href="#">Forgot password ?</Link>
            </Typography>
            <Typography>
                Do you have an account ?
                <Link href="#">Sign up</Link>
            </Typography>
            </Paper>
            
        </Grid>
    </div>
  )
}

export default Login
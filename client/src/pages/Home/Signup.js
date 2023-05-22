import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { blueGrey } from '@mui/material/colors';
const Signup = () => {
    const paperStyle = { padding: 20, height: '66vh', width: 600, margin: '20px auto' };
    const avatarStyle={backgroundColor:"lightblue"}
    const marginStyle={margin:"10px 0"}
    
  const codeStyle = {
    backgroundColor:"#00CED1",
    padding: '2px 4px',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '##FF1493',
    }
   }
    
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <h1 >Sign up</h1>
                    <Typography variant='caption'>Please fill in this form to create an account!</Typography>
                </Grid>
                <form>
                <PersonIcon></PersonIcon>{' '}
                    <TextField style={marginStyle} fullWidth label='Name'></TextField>
                    <TextField style={marginStyle} fullWidth label='Email' type='email'></TextField>
                    <TextField style={marginStyle} fullWidth label='Phone number'></TextField>
                    <TextField style={marginStyle} fullWidth label='Password' type='password'></TextField>
                    <TextField style={marginStyle} fullWidth label='Confirm Password' type='password' ></TextField>
                    <Button style={codeStyle} fullWidth type='submit' variant='contained'> Sign up</Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default Signup;

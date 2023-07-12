import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { Call } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Footer() {
    const styleItem = { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '5px' };

    return (
        <Box>
            <Paper
                elevation={3}
                square
                sx={{
                    backgroundImage: 'linear-gradient(110deg, #2fa362, #20b2aa)',
                }}
            >
                <Container>
                    <Grid container spacing={5} pb={2} mt={0} alignItems="flex-start">
                        <Grid item xs={2}>
                            <img style={{ maxWidth: '100px' }} src="/assets/images/logo.png" alt="logo" />
                        </Grid>
                        <Grid item xs={4} style={{ color: 'white' }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {' '}
                                Địa chỉ
                            </Typography>

                            <Typography style={styleItem}>
                                <LocationOnIcon />
                                Vinhomes Grand Park Quận 2
                            </Typography>
                            <Typography style={styleItem}>
                                <LocationOnIcon />
                                Vinhomes Grand Park Quận 9
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ color: 'white' }} alignItems="flex-start">
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                Hỗ trợ
                            </Typography>
                            <Typography>
                                <Link to="/shopping">Sản phẩm</Link>
                            </Typography>
                            <Typography>
                                <Link to="/cart">Giỏ hàng</Link>
                            </Typography>
                            <Typography>
                                <Link to={`${window.location.protocol}//seller.${window.location.host}/profile`}>
                                    Kênh người bán
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ color: 'white' }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {' '}
                                Liên hệ
                            </Typography>
                            <Typography style={styleItem}>
                                <EmailIcon></EmailIcon>
                                <Typography style={{ marginLeft: '4px', borderBottom: '1px solid' }}>
                                    birdtradingplatform@gmail.com
                                </Typography>
                            </Typography>
                            <Typography style={styleItem}>
                                <CallIcon></CallIcon> <Typography style={{ marginLeft: '4px' }}>0913637656</Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Divider />
                <Typography bgcolor="#ccc" p={1} variant="body1" component="p" sx={{ textAlign: 'center' }}>
                    Copyright &#169; by FPT Students
                </Typography>
            </Paper>
        </Box>
    );
}

export default Footer;

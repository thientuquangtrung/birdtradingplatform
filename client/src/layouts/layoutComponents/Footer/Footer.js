import { Box, Container, Divider, Grid, Link, Paper, Typography } from '@mui/material';

function Footer() {
    return (
        <Box>
            <Paper elevation={3}>
                <Container>
                    <Grid container spacing={2} p={3} mt={0}>
                        <Grid item xs={3}>
                            <img style={{ maxWidth: '100px' }} src="/assets/images/logo.png" alt="logo" />
                        </Grid>
                        <Grid item xs={3}>
                            <Link>Link</Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Link>Link</Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Link>Link</Link>
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

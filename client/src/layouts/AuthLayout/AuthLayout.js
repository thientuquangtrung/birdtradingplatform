import { AppBar, Divider, Toolbar, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Link } from 'react-router-dom';

function AuthLayout({ children }) {
    return (
        <Stack direction="column">
            <AppBar position="sticky" sx={{backgroundColor: '#43a99c'}}>
                <Toolbar sx={{ paddingTop: 1, paddingBottom: 1, justifyContent: 'space-between' }}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <Link to="/">
                            <img width="80px" src="/assets/images/logo.png" alt="logo" />
                        </Link>
                        <Typography variant="h6" component="h1">
                            Bird Trading Platform
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: 'white' }} />
                        <Typography variant="h6" component="h1">
                            Welcome
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle2" component="p">
                        Bạn cần giúp đỡ?
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box padding={3}>{children}</Box>
            <Typography variant="subtitle1" align="center" mt={5} mb={5} component="p">
                © {new Date().getFullYear()} Bird Trading Platform. Tất cả các quyền được bảo lưu.
            </Typography>
        </Stack>
    );
}

export default AuthLayout;

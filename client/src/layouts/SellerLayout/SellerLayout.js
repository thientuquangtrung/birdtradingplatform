import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import AvaText from '../../components/AvaText';
import SellerSidebar from '../layoutComponents/SellerSidebar/SellerSidebar';

function SellerLayout({ children }) {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" alignItems="center" gap={3}>
                        <img width="50px" src="/assets/images/logo.png" alt="logo" />
                        <Typography variant="h5" component="h2">
                            Bird Trading Platform
                        </Typography>
                    </Stack>
                    <Box>
                        <AvaText />
                    </Box>
                </Toolbar>
            </AppBar>
            <Stack direction="row">
                <Stack direction="column" sx={{ width: 300 }} bgcolor="white">
                    <SellerSidebar />
                </Stack>
                <Box bgcolor={'whitesmoke'} flex={1} p={5}>
                    {children}
                </Box>
            </Stack>
        </>
    );
}

export default SellerLayout;

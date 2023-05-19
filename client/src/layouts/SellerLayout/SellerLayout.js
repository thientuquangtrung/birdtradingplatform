import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import SellerSidebar from '../layoutComponents/SellerSidebar/SellerSidebar';

function SellerLayout({ children }) {
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
    
                </Toolbar>
            </AppBar>
            <Stack direction="row">
                <Stack direction="column" sx={{ width: 300}} bgcolor='white'>
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
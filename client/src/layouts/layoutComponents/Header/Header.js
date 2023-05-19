import { AppBar, Avatar, Box, Container, IconButton, InputBase, Menu, Stack, Toolbar, Typography } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';

function Header() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container sx={{ padding: 3 }}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography
                            variant="body2"
                            component="a"
                            href="#"
                            sx={{ color: 'white', textDecoration: 'none' }}
                        >
                            Kênh người bán
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{ width: 26, height: 26 }}
                                alt="Remy Sharp"
                                src="https://mui.com/static/images/avatar/2.jpg"
                            />

                            <Typography variant="body2" component="span">
                                trungdeptrai
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Box flex={1}>LOGO</Box>
                        <Stack bgcolor="white" direction="row" flex={5} borderRadius>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <Search />
                            </IconButton>
                        </Stack>
                        <Box flex={1} sx={{ textAlign: 'center' }}>
                            <ShoppingCart sx={{ width: 40, height: 40 }} />
                        </Box>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

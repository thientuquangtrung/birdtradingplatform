import {
    AppBar,
    Badge,
    Box,
    Container,
    IconButton,
    InputBase,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import Tippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import Cart from '../../../components/Cart';
import AvaText from '../../../components/AvaText';
import { Link } from 'react-router-dom';

function Header() {
    const ref = useRef();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container sx={{ padding: 3 }}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center" mb={2}>
                        <Link to='/shop/profile'>
                            <Typography
                                variant="body2"
                                component="a"
                                href="#"
                                sx={{ color: 'white', textDecoration: 'none' }}
                            >
                                Kênh người bán
                            </Typography>
                        </Link>
                        <AvaText />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box flex={1}>
                            <img style={{ maxWidth: '88px' }} src="/assets/images/logo.png" alt="logo" />
                        </Box>
                        <Stack height={50} bgcolor="white" direction="row" flex={5} borderRadius>
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
                            <Tippy
                                interactive
                                placement="bottom-end"
                                render={(attrs) => (
                                    <Box tabIndex="-1" {...attrs}>
                                        <Cart />
                                    </Box>
                                )}
                            >
                                <Badge badgeContent={4} color="error">
                                    <ShoppingCart sx={{ width: 40, height: 40 }} ref={ref} />
                                </Badge>
                            </Tippy>
                        </Box>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

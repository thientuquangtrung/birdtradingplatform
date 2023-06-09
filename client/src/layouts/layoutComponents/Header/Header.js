import {
    AppBar,
    Badge,
    Box,
    Breadcrumbs,
    Container,
    IconButton,
    InputBase,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import Tippy from '@tippyjs/react/headless';
import { useContext, useRef } from 'react';
import Cart from '../../../components/Cart';
import AvaText from '../../../components/AvaText';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { useState } from 'react';
import React from 'react';
import CartContext from '../../../contexts/CartContext';
import { enqueueSnackbar } from 'notistack';

function Header() {
    const navigate = useNavigate();
    const ref = useRef();

    const { currentUser } = useContext(AuthContext);
    const { cartLength } = useContext(CartContext);
    const [productName, setProductName] = useState('');
    function handlePress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }

    function handleSearch() {
        if (productName === '') {
            enqueueSnackbar('Type something to search', { variant: 'info' });
            return;
        }
        navigate('/shopping', {
            state: {
                q: productName,
            },
        });
    }

    const handleTyping = (e) => {
        if (e.target.value.startsWith(' ')) return;
        setProductName(e.target.value);
    };

    return (
        <AppBar position="sticky" sx={{fontSize: 'xx-small'}}>
            <Toolbar>
                <Container sx={{ padding: 1 }}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center" mb={2}>
                        <Link to={`${window.location.protocol}//seller.${window.location.host}/profile`}>
                            <Typography
                                variant="body2"
                                component="span"
                                href="#"
                                sx={{ color: 'white', textDecoration: 'none' }}
                            >
                                Kênh người bán
                            </Typography>
                        </Link>
                        {currentUser ? (
                            <AvaText user={currentUser} />
                        ) : (
                            <Breadcrumbs separator="|" aria-label="breadcrumb" sx={{ color: 'white' }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                    <Link style={{ color: 'inherit' }} to="/login">
                                        Login
                                    </Link>
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                    <Link style={{ color: 'inherit' }} to="/signup">
                                        Signup
                                    </Link>
                                </Typography>
                            </Breadcrumbs>
                        )}
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box flex={1}>
                            <Link to="/">
                                <img style={{ maxWidth: '88px' }} src="/assets/images/logo.png" alt="logo" />
                            </Link>
                        </Box>
                        <Stack height={50} bgcolor="white" direction="row" flex={5} borderRadius>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                value={productName}
                                onChange={handleTyping}
                                onKeyDown={handlePress}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <Search onClick={handleSearch} />
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
                                <Badge badgeContent={cartLength} color="error">
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

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
import { useContext, useEffect, useRef } from 'react';
import Cart from '../../../components/Cart';
import AvaText from '../../../components/AvaText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { useState } from 'react';
import React from 'react';
import CartContext from '../../../contexts/CartContext';
import { enqueueSnackbar } from 'notistack';
import axiosClient from '../../../api/axiosClient';
import SuggestionList from '../../../components/SuggestionList';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notification from '../../../components/Notification';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartRef = useRef();
    const searchRef = useRef();
    const notificationRef = useRef();

    const { currentUser } = useContext(AuthContext);
    const { cartLength } = useContext(CartContext);
    const [productName, setProductName] = useState('');
    const [suggestData, setSuggestData] = useState([]);
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
        setSuggestData([]);
        navigate('/shopping', {
            state: {
                q: productName,
            },
        });
    }

    function notificationsLabel(count) {
        if (count === 0) {
            return 'no notifications';
        }
        if (count > 99) {
            return 'more than 99 notifications';
        }
        return `${count} notifications`;
    }

    const handleTyping = (e) => {
        if (e.target.value.startsWith(' ')) return;
        setProductName(e.target.value);
    };

    useEffect(() => {
        if (location.pathname !== '/shopping') setProductName('');
    }, [location.pathname]);

    useEffect(() => {
        if (productName === '') {
            setSuggestData([]);
            return;
        } else {
            axiosClient
                .get('product/suggest', {
                    params: {
                        q: productName,
                    },
                })
                .then((response) => {
                    setSuggestData(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [productName]);

    return (
        <AppBar position="sticky" sx={{ fontSize: 'xx-small' }}>
            <Toolbar>
                <Container sx={{ padding: 1 }}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center" mb={1}>
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
                            <Stack direction="row" alignItems="center" gap={5}>
                                <Tippy
                                    interactive
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <Box tabIndex="-1" {...attrs}>
                                            <Notification />
                                        </Box>
                                    )}
                                >
                                    <Stack direction="row" alignItems="center" gap={1} ref={notificationRef}>
                                        <IconButton aria-label={notificationsLabel(100)}>
                                            <Badge badgeContent={100} color="success">
                                                <NotificationsIcon sx={{ color: 'white' }} />
                                            </Badge>
                                        </IconButton>
                                        <Typography fontSize={14} sx={{ cursor: 'pointer' }}>
                                            Thông báo
                                        </Typography>
                                    </Stack>
                                </Tippy>
                                <AvaText user={currentUser} />
                            </Stack>
                        ) : (
                            <Breadcrumbs separator="|" aria-label="breadcrumb" sx={{ color: 'white' }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                    <Link style={{ color: 'inherit' }} to="/login">
                                        Login
                                    </Link>
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                    <Link style={{ color: 'inherit' }} to="/email/verify">
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
                        <Stack height={50} flex={5}>
                            <Tippy
                                visible={suggestData && suggestData.length > 0}
                                hideOnClick={true}
                                interactive
                                placement="bottom-start"
                                render={(attrs) => (
                                    <Box tabIndex="-1" {...attrs} width={`${searchRef.current.offsetWidth}px`}>
                                        <SuggestionList
                                            data={suggestData}
                                            setSuggestData={setSuggestData}
                                            setProductName={setProductName}
                                        />
                                    </Box>
                                )}
                            >
                                <Stack direction="row" bgcolor="white" height="100%" width="100%" borderRadius>
                                    <InputBase
                                        ref={searchRef}
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
                            </Tippy>
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
                                    <ShoppingCart sx={{ width: 40, height: 40 }} ref={cartRef} />
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

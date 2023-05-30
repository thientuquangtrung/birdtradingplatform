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
import {useState} from 'react';
import React from 'react';
import axiosClient from '../../../api/axiosClient';


function Header() {
    const navigate = useNavigate();
    const ref = useRef();

    const { currentUser } = useContext(AuthContext);
    const [productName, setProductName] = useState("");

    function handleSearch() {
        axiosClient
            .get('product/search', {
                params: {
                    q: productName
                },
            })
            .then(function (response) {
                // handle success
                navigate("/shopping", {
                    state: {
                        list: response.data
                    }
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container sx={{ padding: 1 }}>
                    <Stack direction={'row'} justifyContent="space-between" alignItems="center" mb={2}>
                        <Link to={`${window.location.protocol}//seller.${window.location.host}/shop/profile`}>
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
                            <Breadcrumbs     separator="|" aria-label="breadcrumb" sx={{ color: 'white' }}>
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
                            <img style={{ maxWidth: '88px' }} src="/assets/images/logo.png" alt="logo" />
                        </Box>
                        <Stack height={50} bgcolor="white" direction="row" flex={5} borderRadius>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search..."
                                onChange={(e) => setProductName(e.target.value)}
                                
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

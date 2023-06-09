import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import CartContext from '../../contexts/CartContext';
import { Grid, Avatar, ImageList, ImageListItem } from '@mui/material';

function ProductDetail() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { setCartList, setCartLength } = useContext(CartContext);
    const location = useLocation();
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
    ];

    useEffect(() => {
        axiosClient
            .get(`product/${location.state?.id}`)
            .then(function (response) {
                // handle success
                setProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, [location.state]);

    function handleAddToCart() {
        // check if user already logged in

        if (!currentUser) {
            return navigate(`/login?redirectTo=${location.pathname}`);
        }

        axiosClient
            .post('cart', {
                userId: currentUser?.id,
                product,
                quantity,
            })
            .then(function (response) {
                // handle success
                setCartLength(response.data.data.length);
                setCartList(response.data.data.items);
                enqueueSnackbar('Sản phẩm được thêm vào giỏ hàng thành công!', { variant: 'success' });
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }

    return (
        <div>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <Box sx={{ padding: 2 }}>
                    <img
                        style={{ width: '500px', height: '500px', objectFit: 'contain' }}
                        src={product.image}
                        alt="Bird"
                    />
                </Box>
                <Box sx={{ padding: 4, width: '70%' }}>
                    <Stack direction="column" gap={5}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                            {product.name}
                        </Typography>
                        <Typography variant="h4" gutterBottom color="#c80606">
                            {product.price ? product.price.toLocaleString('vi-VN') : ''}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 16 }}>
                            {product.description}
                        </Typography>

                        <TextField
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            defaultValue="1"
                            type="number"
                            inputProps={{ min: '0', max: '10', step: '1' }}
                            sx={{ width: '20%' }}
                        />

                        <Box>
                            <Button
                                onClick={handleAddToCart}
                                variant="contained"
                                startIcon={<AddShoppingCartIcon />}
                                sx={{ color: '#fff', backgroundColor: '#1976d2' }}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            <Paper elevation={1} sx={{ padding: 3 }}>
                <Typography sx={{ paddingBottom: 2 }} variant="h6" gutterBottom>
                    ĐÁNH GIÁ SẢN PHẨM
                </Typography>
                <Grid container sx={{ paddingBottom: 3, borderBottom: '1px solid #e0e0e0', justifyContent: 'center' }}>
                    <Grid item xs={1} sx={{ paddingLeft: 2 }}>
                        <Avatar
                            alt="Remy Sharp"
                            sx={{ width: 60, height: 60 }}
                            src="https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2021/4/22/photo1619081646120-16190816462552046046483.jpg"
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Stack>
                            <Typography variant="h6" display="block">
                                Taylor Swift
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ color: 'grey', fontSize: '10px' }}
                            >
                                11/2/23 4:57
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ paddingTop: 1.5, wordWrap: 'break-word' }}>
                                zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                            </Typography>
                            <ImageList sx={{ width: 300, paddingTop: 1 }}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Stack>
                    </Grid>
                </Grid>

                <Grid container sx={{ paddingTop: 3 }}>
                    <Grid item xs={1} sx={{ paddingLeft: 2 }}>
                        <Avatar
                            alt="Remy Sharp"
                            sx={{ width: 56, height: 56 }}
                            src="https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2021/4/22/photo1619081646120-16190816462552046046483.jpg"
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Stack>
                            <Typography variant="h6" display="block">
                                Taylor Swift
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                sx={{ color: 'grey', fontSize: '10px' }}
                            >
                                11/2/23 4:57
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ paddingTop: 1, wordWrap: 'break-word' }}>
                                Sản phẩm đẹp, giá hợp lí
                                zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                            </Typography>
                            <ImageList sx={{ width: 300 }}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default ProductDetail;

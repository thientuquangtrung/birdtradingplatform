import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import CartContext from '../../contexts/CartContext';

function ProductDetail() {
    const { currentUser } = useContext(AuthContext);
    const { setCartList, setCartLength } = useContext(CartContext);
    const location = useLocation();
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

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
        <Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ padding: 2 }}>
                <img style={{ width: '500px', height: '500px', objectFit: 'contain' }} src={product.image} alt="Bird" />
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
    );
}

export default ProductDetail;

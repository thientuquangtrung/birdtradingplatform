import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState('');

    useEffect(() => {
        axiosClient
            .get(`product/${id}`)
            .then(function (response) {
                // handle success
                setProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, []);
    return (
        <Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ padding: 3 }}>
                <img
                    style={{ width: '100%', height: '100%', backgroundSize: 'contain', objectFit: 'contain' }}
                    src={product.image}
                    alt="Bird"
                />
            </Box>
            <Box sx={{ padding: 4, width: '60%' }}>
                <Stack direction="column" gap={5}>
                    <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                        {product.name}
                    </Typography>
                    <Typography variant="h4" gutterBottom color="#c80606">
                        <AttachMoneyIcon fontSize="large" /> {product.price}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 16 }}>
                        {product.description}
                    </Typography>

                    <TextField
                        defaultValue="1"
                        type="number"
                        inputProps={{ min: '0', max: '10', step: '1' }}
                        sx={{ width: '20%' }}
                    />

                    <Box>
                        <Button
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

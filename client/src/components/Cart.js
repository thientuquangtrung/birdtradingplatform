import { Box, Button, MenuList, Paper, Stack, Typography } from '@mui/material';
import CartItem from './CartItem';
import { useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartList, setCartList] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axiosClient
            .get('cart', {
                params: {
                    userId: currentUser?.id,
                },
            })
            .then((response) => {
                setCartList(response.data.slice(0, 5));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Paper>
            <Stack p>
                <Box mb={1} mt={1}>
                    <Typography variant="subtitle1">Sản phẩm mới thêm</Typography>
                </Box>
                <MenuList mb={1}>
                    {cartList.length > 0 &&
                        cartList.map((item) => {
                            return (
                                <Link to={`/product/detail/${item.product.name}`} state={{id: item.product.id}}>
                                    <CartItem key={item.product.id} data={item.product} />
                                </Link>
                            );
                        })}
                </MenuList>
                <Stack>
                    <Button variant="contained" color="primary">
                        Xem giỏ hàng
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Cart;

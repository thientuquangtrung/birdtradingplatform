import { Box, Button, MenuList, Paper, Stack, Typography } from '@mui/material';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../contexts/CartContext';

function Cart() {
    const { cartList } = useContext(CartContext);

    return (
        <Paper>
            <Stack width={'350px'} p>
                <Box mb={1} mt={1}>
                    <Typography variant="subtitle1">
                        {cartList.length > 0 ? 'Sản phẩm mới thêm' : 'Chưa có sản phẩm'}
                    </Typography>
                </Box>
                {cartList.length > 0 ? (
                    <>
                        <MenuList mb={1}>
                            {cartList.slice(0, 5).map((item) => {
                                return (
                                    <Link to={`/product/detail/${item.product.name}`} state={{ id: item.product.id }}>
                                        <CartItem key={item.product.id} data={item.product} />
                                    </Link>
                                );
                            })}
                        </MenuList>
                        <Stack direction={'row'} justifyContent={'flex-end'}>
                            <Link to="/cart">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#43a99c',
                                        '&:hover': {
                                            backgroundColor: '#43a99c',
                                        },
                                    }}
                                >
                                    Xem giỏ hàng
                                </Button>
                            </Link>
                        </Stack>
                    </>
                ) : (
                    <img style={{ width: '100%' }} src="/assets/images/empty-cart.jpg" alt="empty-cart" />
                )}
            </Stack>
        </Paper>
    );
}

export default Cart;

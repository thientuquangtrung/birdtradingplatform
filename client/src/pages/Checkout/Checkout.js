import { Box, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AuthContext from '../../contexts/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StoreIcon from '@mui/icons-material/Store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { enqueueSnackbar } from 'notistack';
import CartContext from '../../contexts/CartContext';
import Payment from '../../components/Payment';
import PaypalButton from '../../components/PaypalButton';
import VNPayButton from '../../components/VNPayButton';
import Button from '@mui/joy/Button';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoMoButton from '../../components/MoMoButton';


function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { setCartList, setCartLength } = useContext(CartContext);
    const paperStyle = { padding: 20, width: '100%', margin: '20px auto' };

    const [shipToAddress, setShipToAddress] = useState(currentUser.shipToAddress);
    const [phone, setPhone] = useState(currentUser.phone);
    const [shopOrders, setShopOrders] = useState([]);
    const [shopOrderIds, setShopOrderIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [selectedOption, setSelectedOption] = useState('');

    const isChange = () => {
        return !(currentUser.phone !== phone || currentUser.shipToAddress !== shipToAddress);
    };

    const handlePlaceOrder = () => {
        axiosClient
            .post('place_order', {
                userId: currentUser.id,
                shopOrderIds,
            })
            .then((response) => {
                setCartList(response.data.data.cartList);
                setCartLength(response.data.data.cartList.length);
                enqueueSnackbar('Placed order successfully!', { variant: 'success' });
                navigate('/orders');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (!location.state || !location.state.payload) return;

        axiosClient
            .post('checkout', location.state.payload)
            .then((response) => {
                setShopOrderIds(response.data.data.shopOrderIds);
                setShopOrders(response.data.data.shopOrderIdsNew);
                setTotalPrice(response.data.data.checkoutOrder.totalPrice);
            })
            .catch((error) => console.log(error));
    }, [location.state]);
    return (
        <div>
            <Paper elevation={2} style={paperStyle}>
                <div style={{ display: 'flex', margin: '20px' }}>
                    <LocationOnIcon></LocationOnIcon>
                    <Typography>Địa chỉ nhận hàng</Typography>
                </div>
                <div style={{ display: 'flex', margin: '15px' }}>
                    <TextField value={phone} label="Số điện thoại" sx={{ paddingRight: '50px' }} disabled></TextField>
                    <TextField fullWidth value={shipToAddress} label="Địa chỉ" disabled></TextField>
                    <Button style={{ marginLeft: '20px' }}>Thay đổi</Button>
                </div>
            </Paper>

            <TableContainer component={Paper} style={paperStyle}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Hình ảnh</TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell align="center">Đơn giá</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center">Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shopOrders.length > 0 &&
                            shopOrders.map((shopOrder) => {
                                return (
                                    <>
                                        <TableRow sx={{ borderTop: '1px solid #e0e0e0' }}>
                                            <TableCell sx={{ borderBottom: 'none', paddingLeft: '40px' }} colSpan={5}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <StoreIcon></StoreIcon>
                                                    <Link
                                                        to={`/shop/${shopOrder.shop.name}`}
                                                        state={{
                                                            shopId: shopOrder.shop.id,
                                                        }}
                                                    >
                                                        <Button
                                                            variant="text"
                                                            style={{ backgroundColor: 'white', color: 'black' }}
                                                        >
                                                            {shopOrder.shop.name}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {shopOrder.items.map((item) => (
                                            <TableRow
                                                key={item.name}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell sx={{ border: 'none' }} component="th" scope="row">
                                                    <img src={item.image} width="60px" height="60px" alt=""></img>
                                                </TableCell>
                                                <TableCell sx={{ border: 'none' }}>{item.name}</TableCell>
                                                <TableCell sx={{ border: 'none' }} align="center">
                                                    {item.price}
                                                </TableCell>
                                                <TableCell sx={{ border: 'none' }} align="center">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell sx={{ border: 'none' }} align="center">
                                                    {item.subTotal}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper elevation={3} style={{ ...paperStyle, position: 'sticky', bottom: '0' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: 'solid  1px Gainsboro',
                        paddingBottom: '10px',
                    }}
                >
                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: 450 }}>
                            <Payment selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <Typography style={{ fontSize: '20px', fontWeight: 450 }}>
                                Phương thức: {selectedOption && JSON.parse(selectedOption).label}
                            </Typography>
                        </div>
                    </div>
                </div>

                <div>
                    <Box align="center">
                        <Stack gap={3} direction={'row'} justifyContent="flex-end" alignItems={'center'} flexDirection="column">
                            <div style={{ margin: '10px 0 10px 0' }}>
                                <Typography style={{ fontSize: '22px', color: 'red' }}>
                                    Tổng tiền hàng: {totalPrice.toLocaleString('vi-VN')}₫
                                </Typography>
                            </div>
                            <Button
                                onClick={handlePlaceOrder}
                                sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: '250px', height: '40px' }}
                                size="large"
                                variant="soft"
                                color="neutral"
                                startDecorator= {<PaymentsIcon />}
                            >
                                <Stack direction='row' alignItems='center' gap={1} marginLeft={2}>
                                    <Typography variant="h6" fontSize={16} >Thanh toán khi nhận hàng</Typography>
                                </Stack>
                            </Button>
                            <MoMoButton />
                            <VNPayButton />
                            <PaypalButton ordersData={{ userId: currentUser.id, shopOrderIds }} />
                            {/* {selectedOption && JSON.parse(selectedOption).value === 'PAYPAL' && (
                            )} */}
                        </Stack>
                    </Box>
                    <Box align="center" style={{ margin: '10px 0 0 0' }}></Box>
                </div>
            </Paper>
        </div>
    );
}

export default Checkout;

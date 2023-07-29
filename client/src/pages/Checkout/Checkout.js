import { Box, Button, IconButton, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
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
import { Button as JoyButton } from '@mui/joy';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoMoButton from '../../components/MoMoButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/joy/Chip';
import handleError from '../../utils/handleError';

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        // height:500,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
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
                handleError(error);
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
                localStorage.setItem('shopOrderIds', JSON.stringify(response.data.data.shopOrderIds));
            })
            .catch((error) => handleError(error));
    }, [location.state]);

    useEffect(() => {
        if (!location.search) return;
        const controller = new AbortController();
        if (localStorage.getItem('shopOrderIds')) {
            axiosClient
                .post(
                    `vnpay_return${location.search}`,
                    {
                        userId: currentUser.id,
                        shopOrderIds: JSON.parse(localStorage.getItem('shopOrderIds')),
                    },
                    {
                        signal: controller.signal,
                    },
                )
                .then((response) => {
                    enqueueSnackbar('Placed order successfully!', { variant: 'success' });
                    navigate('/orders');
                })
                .catch((error) => handleError(error));
        }

        return () => {
            controller.abort();
        };
    }, []);
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
                    <Button style={{ marginLeft: '20px', color: '#43a99c' }}>Thay đổi</Button>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Typography style={{ fontSize: '21px', fontWeight: 400 }}>Phương thức:</Typography>
                        </div>
                        <Typography style={{ fontSize: '22px', color: '#424242', fontWeight: 400 }}>
                            {selectedOption && JSON.parse(selectedOption).label}
                        </Typography>
                    </div>
                    <div>
                        <Typography style={{ fontSize: '22px', fontWeight: 400 }}>
                            <Payment selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        </Typography>
                    </div>
                </div>

                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ flex: 1 }}>
                                Chính sách trả hàng hoặc hoàn tiền cho sản phẩm của Shop được quy định
                            </span>
                            <Button size="small" onClick={handleOpen} sx={{ color: '#388f84' }}>
                                tại đây
                            </Button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Stack direction="row" alignItems="center">
                                    <Chip
                                        variant="soft"
                                        size="md"
                                        sx={{ fontSize: 20, margin: '5px auto 30px', height: '36px' }}
                                    >
                                        Điều kiện yêu cầu trả hàng/ hoàn tiền
                                    </Chip>
                                </Stack>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 10,
                                        bgcolor: '#eeeeee',
                                        width: '30px',
                                        height: '30px',
                                    }}
                                    size="xx-small"
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* <Typography variant="body1" display="block">
                                    Mọi vấn đề thắc mắc trong việc đổi trả/ hoàn hàng thì liên hệ trực tiếp Shop thông
                                    qua số điện thoại/ mục chat
                                </Typography> */}

                                <Typography variant="body1" display="block" gutterBottom paddingBottom={1}>
                                    <div style={{ fontWeight: 'bold' }}>I/ CHIM CẢNH</div>
                                    <ul style={{ paddingLeft: 30, listStyle: 'circle' }}>
                                        <li>
                                            Liên hệ số điện thoại trong mô tả của Shop mà bạn đã thực hiện giao dịch
                                            trước đó.
                                        </li>
                                    </ul>
                                </Typography>

                                <Typography variant="body1" display="block" gutterBottom paddingBottom={1}>
                                    <div style={{ fontWeight: 'bold' }}>II/ THỨC ĂN</div>

                                    <ul style={{ paddingLeft: 30, listStyle: 'circle' }}>
                                        <li>Sản phẩm phải còn nguyên đóng gói và chưa mở.</li>
                                        <li>Hạn sử dụng của thức ăn phải còn thời gian hợp lệ.</li>
                                        <li>
                                            Yêu cầu trả hàng/hoàn tiền phải được gửi lại trong vòng một tuần kể từ ngày
                                            mua.
                                        </li>
                                    </ul>
                                </Typography>

                                <Typography variant="body1" display="block" gutterBottom>
                                    <div style={{ fontWeight: 'bold' }}>III/ PHỤ KIỆN</div>

                                    <ul style={{ paddingLeft: 30, listStyle: 'circle' }}>
                                        <li>
                                            Yêu cầu trả hàng/hoàn tiền chỉ áp dụng cho lồng bị hư hỏng do lỗi sản xuất.
                                        </li>
                                    </ul>
                                </Typography>
                            </Box>
                        </Modal>
                    </Alert>
                </Stack>

                <div>
                    <Box align="center">
                        <Stack
                            gap={3}
                            direction={'column'}
                            justifyContent="flex-end"
                            alignItems={'center'}
                            flexDirection="column"
                        >
                            <div style={{ margin: '30px 0 10px 0', display: 'flex', alignItems: 'center' }}>
                                <div style={{ margin: '0 10px 0 0' }}>
                                    <Typography style={{ fontSize: '20px', color: '#212121', fontWeight: '400' }}>
                                        Tổng tiền hàng:
                                    </Typography>
                                </div>

                                <Typography style={{ fontSize: '25px', color: 'rgb(254, 56, 52)' }}>
                                    {totalPrice.toLocaleString('vi-VN')}₫
                                </Typography>
                            </div>
                            {selectedOption && JSON.parse(selectedOption).value === 'COD' && (
                                <JoyButton
                                    ordersData={{ userId: currentUser.id, shopOrderIds }}
                                    onClick={handlePlaceOrder}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '10px',
                                        width: '280px',
                                        height: '52px',
                                    }}
                                    size="large"
                                    variant="soft"
                                    color="neutral"
                                    startDecorator={<PaymentsIcon />}
                                >
                                    <Stack direction="row" alignItems="center" gap={1} marginLeft={2}>
                                        <Typography variant="h6" fontSize={16}>
                                            Thanh toán khi nhận hàng
                                        </Typography>
                                    </Stack>
                                </JoyButton>
                            )}

                            {selectedOption && JSON.parse(selectedOption).value === 'MOMO' && (
                                <MoMoButton ordersData={{ userId: currentUser.id, shopOrderIds }} />
                            )}

                            {selectedOption && JSON.parse(selectedOption).value === 'VNPAY' && (
                                <VNPayButton ordersData={{ userId: currentUser.id, shopOrderIds }} />
                            )}

                            {selectedOption && JSON.parse(selectedOption).value === 'PAYPAL' && (
                                <PaypalButton ordersData={{ userId: currentUser.id, shopOrderIds }} />
                            )}
                        </Stack>
                    </Box>
                    <Box align="center" style={{ margin: '10px 0 0 0' }}></Box>
                </div>
            </Paper>
        </div>
    );
}

export default Checkout;

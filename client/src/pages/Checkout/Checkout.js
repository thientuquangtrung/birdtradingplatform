import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AuthContext from '../../contexts/AuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import StoreIcon from '@mui/icons-material/Store';

function Checkout() {
    const { currentUser } = useContext(AuthContext);
    const paperStyle = { padding: 20, width: '100%', margin: '20px auto' };
    const [shipToAddress, setShipToAddress] = useState(currentUser.shipToAddress);
    const [phone, setPhone] = useState(currentUser.phone);
    const isChange = () => {
        return !(currentUser.phone !== phone || currentUser.shipToAddress !== shipToAddress);
    };
    function createData(image, name, price, quantity, total) {
        return { image, name, price, quantity, total };
    }

    const rows = [
        createData('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg', 'Chim 1', 159000, 2, 24, 4.0),
        createData('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg', 'Chim 2', 237000, 3, 37, 4.3),
    ];
    const totalPrice = rows.reduce((accumulator, row) => accumulator + row.price, 0);
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
                        <TableCell sx={{ borderBottom: 'none', paddingLeft: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StoreIcon></StoreIcon>

                                <Button variant="text" style={{ backgroundColor: 'white', color: 'black' }}>
                                    Shop name
                                </Button>
                            </div>
                        </TableCell>
                    </TableBody>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <img src={row.image} width="60px" height="60px"></img>
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper elevation={1} style={paperStyle}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: 'solid  1px Gainsboro',
                        margin: '10px 0',
                        paddingBottom: '30px',
                    }}
                >
                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: 450 }}>Phương thức thanh toán</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '60px' }}>
                            <Typography style={{ fontSize: '20px', fontWeight: 450 }}>
                                Thanh toán khi nhận hàng
                            </Typography>
                        </div>
                    </div>
                </div>

                <Box align="right">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'red' }}>
                        <div style={{ margin: '15px 60px 10px 0' }}>
                            <Typography style={{ fontSize: '22px' }}>Tổng tiền hàng: {totalPrice} </Typography>
                        </div>
                    </div>
                </Box>
                <Box align="right" style={{ margin: '15px 120px 0 0' }}>
                    <Button sx={{ display: 'flex', justifyContent: 'flex-end' }} variant="contained">
                        Đặt hàng
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default Checkout;

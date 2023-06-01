import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Title = styled.h1`
    font-weight: 550;
    text-align: center;
`;

function createData(name, amount, cost) {
    return { name, amount, cost };
}

const rows = [
    createData(
        'Quần què',

        1,
        '138$',
    ),
    createData('Ice cream sandwich', 1, '20$'),
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(rows);

    const handleMinus = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].amount > 1) {
            updatedCartItems[index].amount -= 1;
            setCartItems(updatedCartItems);
        }
    };

    const handlePlus = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].amount += 1;
        setCartItems(updatedCartItems);
    };

    const handleDelete = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    return (
        <Paper>
            <Title style={{ textDecoration: 'underline' }}>Giỏ hàng</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/">
                    <Button
                        variant="contained"
                        sx={{
                            margin: '20px',
                            backgroundColor: 'lightblue',
                            '&:hover': {
                                backgroundColor: '#99FFCC',
                            },
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Link>

                <Button
                    variant="contained"
                    sx={{
                        margin: '5px',
                        backgroundColor: 'lightblue',
                        '&:hover': {
                            backgroundColor: '#99FFCC',
                        },
                    }}
                >
                    Checkout
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Sản phẩm</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center">Số tiền</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((row, index) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>

                                <TableCell>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button onClick={() => handleMinus(index)}>-</Button>
                                        <div style={{ padding: '3px' }}>{row.amount}</div>
                                        <Button onClick={() => handlePlus(index)}>+</Button>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{row.cost}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleDelete(index)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Cart;

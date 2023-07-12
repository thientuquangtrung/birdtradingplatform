import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';
import { enqueueSnackbar } from 'notistack';

const Actions = ({ data }) => {
    function createData(image, name, amount, price) {
        return { image, name, amount, price };
    }

    const rows = [
        createData(
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            'Quần què',
            1,
            '138$',
        ),
        createData('Ice cream sandwich', 1, '20$'),
    ];
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // Implement your delete logic here
        console.log('Delete item with ID:', data.value);
        // Close the dialog
        handleClose();
    };

    return (
        <Stack direction="row" spacing={0.5}>
            <React.Fragment>
                <IconButton color="primary" aria-label="delete" onClick={handleClickOpen} >
                    <DeleteIcon sx={{color: '#43a99c'}} />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Bạn có chắc chắn muốn xóa sản phẩm không?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Hành động này không thể phục hồi.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Không</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Có
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Stack>
    );
};
export default function CartTable({ rows = [] }) {
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

    if (cartItems.length > 0) {
        cartItems.forEach((item) => {
            delete item.shopId;
            delete item.categoryId;
        });
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={cartItems}
                columns={[
                    {
                        field: 'image',
                        headerName: 'Hình ảnh',
                        width: 100,
                        renderCell: (rowData) => (
                            <img
                                src={rowData.value}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt=""
                            />
                        ),
                    },
                    { field: 'name', headerName: 'Tên sản phẩm', width: 180 },
                    { field: 'amount', headerName: 'Số lượng', width: 200 },
                    { field: 'price', headerName: 'Giá', width: 100 },
                    {
                        field: 'id',
                        headerName: 'Thao tác',
                        width: 100,
                        renderCell: (params) => (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => handleMinus(params.rowIndex)}>-</Button>
                                <div style={{ padding: '3px' }}>{params.row.amount}</div>
                                <Button onClick={() => handlePlus(params.rowIndex)}>+</Button>
                            </div>
                        ),
                    },
                ]}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

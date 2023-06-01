import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axiosClient from '../../components/Cart';
import handleError from '../../utils/handleError';

const Actions = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axiosClient
            .delete(`seller/product/${data.value}`)
            .then(function (response) {
                // handle success
                enqueueSnackbar('Đã xóa sản phẩm thành công', { variant: 'success' });
                setOpen(false);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    };

    return (
        <Stack direction="row" spacing={0.5}>
            <React.Fragment>
                <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon />
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

const Quantity = ({ rowData }) => {
    const [cartItems, setCartItems] = useState([rowData]);

    const handleMinus = () => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            if (updatedCartItems[0].quantity > 1) {
                updatedCartItems[0].quantity -= 1;
            }
            return updatedCartItems;
        });
    };

    const handlePlus = () => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[0].quantity += 1;
            return updatedCartItems;
        });
    };

    return (
        <React.Fragment>
            <Button onClick={handleMinus}>-</Button>
            <div style={{ padding: '3px' }}>{cartItems[0].quantity}</div>
            <Button onClick={handlePlus}>+</Button>
        </React.Fragment>
    );
};

const columns = [
    {
        field: 'image',
        headerName: 'Hình ảnh',
        width: 120,
        renderCell: (rowData) => (
            <img src={rowData.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        ),
        headerAlign: 'center',
        align: 'center',
    },
    { field: 'name', headerName: 'Tên sản phẩm', width: 200 },

    {
        field: 'quantity',
        headerName: 'Số lượng',
        width: 300,
        renderCell: (params) => <Quantity rowData={params.row} />,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },

    {
        field: 'id',
        headerName: 'Thao tác',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: (rowAction) => <Actions data={rowAction} />,
    },
];

const rows = [
    {
        id: 1,
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        name: 'Chim 1',
        quantity: 1,
        price: 35000,
    },
    {
        id: 2,
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        name: 'Chim 2',
        quantity: 3,
        price: 65000,
    },
    {
        id: 3,
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        name: 'Chim 3',
        quantity: 4,
        price: 105000,
    },
];
export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

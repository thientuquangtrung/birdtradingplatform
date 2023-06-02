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
import { enqueueSnackbar } from 'notistack';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
import { useContext, useCallback, useState, useMemo } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';

const Actions = ({ data }) => {
    const { setCartLength, setCartList } = useContext(CartContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { currentUser } = useContext(AuthContext);
    const handleDelete = () => {
        axiosClient
            .delete(`cart/item`, {
                data: {
                    userId: currentUser.id,
                    product: data.row,
                },
            })
            .then(function (response) {
                // handle success
                setCartList(response.data.data.items);
                setCartLength(response.data.data.length);
                enqueueSnackbar('Đã xóa sản phẩm khỏi giỏ hàng', { variant: 'success' });
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
    const { currentUser } = useContext(AuthContext);

    const handleMinus = () => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            if (updatedCartItems[0].quantity > 1) {
                updatedCartItems[0].quantity -= 1;
            }
            axiosClient
                .put('cart', {
                    userId: currentUser.id,
                    product: updatedCartItems[0],
                    quantity: updatedCartItems[0].quantity,
                })
                .then((response) => {})
                .catch((error) => console.log(error));

            return updatedCartItems;
        });
    };

    const handlePlus = () => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems];
            updatedCartItems[0].quantity += 1;
            axiosClient
                .put('cart', {
                    userId: currentUser.id,
                    product: updatedCartItems[0],
                    quantity: updatedCartItems[0].quantity,
                })
                .then((response) => {})
                .catch((error) => console.log(error));

            return updatedCartItems;
        });
    };

    return (
        <>
            <Button onClick={handleMinus}>-</Button>
            <div style={{ padding: '3px' }}>{cartItems[0].quantity}</div>
            <Button onClick={handlePlus}>+</Button>
        </>
    );
};

export default function CartDetail() {
    const { cartList } = useContext(CartContext);

    const modifiedCartList = useCallback(() => {
        let rows = [];
        if (cartList.length > 0) {
            rows = cartList.map((item) => {
                return {
                    ...item.product,
                    quantity: parseInt(item.quantity),
                };
            });
        }

        return rows;
    }, [cartList]);

    const columns = useMemo(
        () => [
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
        ],
        [],
    );

    return (
        <div style={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DataGrid
                disableRowSelectionOnClick
                rows={modifiedCartList()}
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

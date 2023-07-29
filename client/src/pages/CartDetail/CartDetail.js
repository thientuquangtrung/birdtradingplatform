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
import { useContext, useCallback, useState, useMemo, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import { Divider, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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
                    <DeleteIcon sx={{ color: '#43a99c' }} />
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
                        <Button onClick={handleClose} sx={{ color: '#43a99c' }}>
                            Không
                        </Button>
                        <Button onClick={handleDelete} autoFocus color="error">
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
    const { setCartList } = useContext(CartContext);

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
                .then((response) => {
                    setCartList(response.data.data.items);
                })
                .catch((error) => handleError(error));

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
                .then((response) => {
                    setCartList(response.data.data.items);
                })
                .catch((error) => handleError(error));

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
    const { currentUser } = useContext(AuthContext);
    const { cartList } = useContext(CartContext);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (rowSelectionModel.length === 0) {
            setTotalPrice(0);
            return;
        }

        const selected = cartList.filter((item) => rowSelectionModel.includes(item.product.id));
        const total = selected.reduce((acc, item) => (acc += Number(item.product.price) * Number(item.quantity)), 0);
        setTotalPrice(total);
    }, [rowSelectionModel, cartList]);

    const handleCheckout = () => {
        const selected = cartList.filter((item) => rowSelectionModel.includes(item.product.id));
        const selectedByShopId = selected.reduce(function (r, a) {
            r[a.product.shopId] = r[a.product.shopId] || [];
            r[a.product.shopId].push({ ...a.product, quantity: Number(a.quantity) });
            return r;
        }, {});

        const shopOrderIds = [];
        for (const [key, value] of Object.entries(selectedByShopId)) {
            shopOrderIds.push({
                shopId: key,
                items: value,
            });
        }

        navigate('/cart/checkout', {
            state: {
                payload: {
                    userId: currentUser.id,
                    shopOrderIds,
                },
            },
        });
    };

    const modifiedCartList = useCallback(() => {
        let rows = [];
        if (cartList.length > 0) {
            rows = cartList.map((item) => {
                return {
                    ...item.product,
                    quantity: Number(item.quantity),
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
        <>
            <div
                style={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <DataGrid
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    keepNonExistentRowsSelected
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
            <Paper elevation={3} sx={{ padding: '20px', margin: '20px 0' }}>
                <Stack direction={'row'} justifyContent="flex-end" alignItems={'center'}>
                    <Typography>Tổng thanh toán ({rowSelectionModel.length} sản phẩm):</Typography>
                    <Typography ml={2} variant="h5" component="span" color={'orangered'}>
                        {totalPrice.toLocaleString('vi-VN')}₫
                    </Typography>
                </Stack>
                <Divider sx={{ margin: '10px 0' }} />
                <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                    <Link to={'/shopping'}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#43a99c',
                                borderColor: '#43a99c',
                                '&:hover': {
                                    borderColor: '#43a99c',
                                },
                            }}
                        >
                            Tiếp tục mua hàng
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        disabled={rowSelectionModel.length <= 0}
                        onClick={handleCheckout}
                        sx={{
                            backgroundColor: '#43a99c',
                            '&:hover': {
                                backgroundColor: '#43a99c',
                            },
                        }}
                    >
                        Tiến hành đặt hàng
                    </Button>
                </Stack>
            </Paper>
        </>
    );
}

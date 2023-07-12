import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Modal,
    Pagination,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomNoRowsOverlay from '../components/CustomNoRowsOverlay';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaymentsIcon from '@mui/icons-material/Payments';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import AuthContext from '../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import AllInboxIcon from '@mui/icons-material/AllInbox';

function OrderTab({ status }) {
    const [tableData, setTableData] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalState, setModalState] = useState({});
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedValue, setSelectedValue] = useState(0);
    const [cancelReasons, setCancelReasons] = useState([]);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        axiosClient
            .get(`seller/order/${currentUser.id}`, {
                params: {
                    page: currentPage,
                    perPage: 30,
                    status,
                },
            })
            .then(function (response) {
                setTableData(response.data.data);
                setTotalPage(response.data.meta.totalPages);
                setCurrentPage(response.data.meta.currentPage);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [currentPage]);

    useEffect(() => {
        axiosClient
            .get('order/cancel_reason', {
                params: {
                    role: 'SELLER',
                },
            })
            .then((response) => {
                // console.log(response);
                setCancelReasons(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const changeOrderStatus = (id, status) => {
        axiosClient
            .put(`order/change_status/${id}`, {
                status,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const cancelOrder = (id) => {
        axiosClient
            .delete(`order/cancel/${id}`, {
                params: {
                    status: 'CANCELED',
                    cancelId: selectedValue,
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white', // Update the background color here
        border: 'none',
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
    };

    const paperStyle = { width: '100%', margin: '20px auto' };

    function filterTable(updatedTableData, ignoreStatus) {
        if (status) {
            const filteredTableData = updatedTableData.filter((item) => item.status !== ignoreStatus);
            setTableData(filteredTableData);
        } else {
            setTableData(updatedTableData);
        }
        handleClose();
    }
    const handlePickup = () => {
        const updatedTableData = tableData.map((item) => {
            if (item.orderId === modalState.orderId) {
                changeOrderStatus(modalState.orderId, 'PICKUP');
                return { ...item, status: 'PICKUP' };
            }
            return item;
        });
        filterTable(updatedTableData, 'PICKUP');
        enqueueSnackbar('Đang lấy hàng', { variant: 'success' });

        return;
    };
    const handleDelivering = () => {
        const updatedTableData = tableData.map((item) => {
            if (item.orderId === modalState.orderId) {
                changeOrderStatus(modalState.orderId, 'SHIPPING');
                return { ...item, status: 'SHIPPING' };
            }
            return item;
        });
        filterTable(updatedTableData, 'SHIPPING');
        enqueueSnackbar('Đơn hàng đang giao', { variant: 'success' });

        return;
    };

    const handleSuccessful = () => {
        const updatedTableData = tableData.map((item) => {
            if (item.orderId === modalState.orderId) {
                changeOrderStatus(modalState.orderId, 'COMPLETED');
                return { ...item, status: 'COMPLETED' };
            }
            return item;
        });

        filterTable(updatedTableData, 'COMPLETED');
        enqueueSnackbar('Giao hàng thành công', { variant: 'success' });
    };

    const handleCancelConfirmationClose = (confirmed) => {
        setCancelConfirmationOpen(false);
        if (confirmed) {
            const updatedTableData = tableData.map((item) => {
                if (item.orderId === modalState.orderId) {
                    cancelOrder(modalState.orderId);
                    return { ...item, status: 'CANCELED' };
                }
                return item;
            });
            filterTable(updatedTableData, 'CANCELED');
            enqueueSnackbar('Hủy đơn hàng thành công', { variant: 'success' });
        }
    };

    const handleCancelConfirmationOpen = () => {
        setCancelConfirmationOpen(false);
    };

    const handleOpen = (item) => {
        setModalState(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderStatus = (status) => {
        if (status === 'PENDING') {
            return <Chip label="PENDING" icon={<PendingActionsIcon />} color="warning" />;
        } else if (status === 'SHIPPING') {
            return <Chip label="DELIVERING" icon={<DeliveryDiningIcon />} color="info" />;
        } else if (status === 'COMPLETED') {
            return <Chip label="SUCCESSFUL" icon={<DoneIcon />} color="success" />;
        } else if (status === 'CANCELED') {
            return <Chip label="CANCELLED" icon={<CloseIcon />} color="error" />;
        } else if (status === 'PICKUP') {
            return <Chip label="PICKUP" icon={<AllInboxIcon />} sx={{ color: 'white', backgroundColor: '#ffeb3b' }} />;
        }
    };
    const renderStatusOnCustomer = (status) => {
        if (status === 'PENDING') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                    <Stack direction="row">
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: '10px',
                                color: 'white',
                                backgroundColor: '#ffeb3b',
                                '&:hover': {
                                    backgroundColor: '#ffeb3b',
                                },
                            }}
                            onClick={() => handlePickup()}
                        >
                            <AllInboxIcon />
                            PICKUP
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ borderRadius: '10px', marginLeft: '20px' }}
                            onClick={() => setCancelConfirmationOpen(true)}
                        >
                            <CloseIcon />
                            CANCELLED
                        </Button>
                    </Stack>
                </Stack>
            );
        }
        if (status === 'PICKUP') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                    <Stack direction="row">
                        <Button
                            variant="contained"
                            size="small"
                            color="info"
                            sx={{ borderRadius: '10px' }}
                            onClick={() => handleDelivering()}
                        >
                            <DeliveryDiningIcon />
                            DELIVERING
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ borderRadius: '10px', marginLeft: '20px' }}
                            onClick={() => setCancelConfirmationOpen(true)}
                        >
                            <CloseIcon />
                            CANCELLED
                        </Button>
                    </Stack>
                </Stack>
            );
        }
        if (status === 'SHIPPING') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                    <Stack direction="row">
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ borderRadius: '10px' }}
                            onClick={handleSuccessful}
                        >
                            <DoneIcon />
                            Successful
                        </Button>
                    </Stack>
                </Stack>
            );
        }
        if (status === 'COMPLETED') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                </Stack>
            );
        }
        if (status === 'CANCELED') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                </Stack>
            );
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,

        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 16,
        p: 4,
    };

    return (
        <>
            <Stack>
                <div style={{ fontWeight: '550', marginTop: '20px' }}>{tableData.length} Đơn hàng</div>
            </Stack>
            <Stack>
                <TableContainer component={Paper} style={paperStyle}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell align="center">Tổng đơn hàng</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.length > 0 ? (
                                tableData.map((item) => (
                                    <TableRow key={item.orderId}>
                                        <TableCell scope="row">{item.orderId}</TableCell>
                                        <TableCell>{item.customer.name}</TableCell>
                                        <TableCell align="center">{item.products.length}</TableCell>
                                        <TableCell align="center">{renderStatus(item.status)}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleOpen(item)}>
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CustomNoRowsOverlay />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography id="modal-modal-title" variant="h4" component="h3">
                                Chi tiết đơn hàng
                            </Typography>
                            <Chip label={`Mã đơn hàng ${modalState.orderId}`} color="secondary" />
                        </Stack>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tên khách hàng: <span>{modalState.customer?.name}</span>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Số điện thoại: <span>{modalState.customer?.phone}</span>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Địa chỉ: <span>{modalState.customer?.shipToAddress}</span>
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h3"
                                sx={{ mt: 1 }}
                                fontSize="22px"
                            >
                                <PaymentsIcon></PaymentsIcon> Phương thức thanh toán:
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography id="modal-modal-description" sx={{ mt: 1 }} fontSize="18px">
                                Thanh toán khi nhận hàng
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="column" sx={{ overflowY: 'scroll' }} maxHeight="500px">
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sản phẩm</TableCell>
                                    <TableCell align="center">Đơn giá</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modalState?.products?.map((product) => (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Stack direction="row" alignItems="center">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    width="70px"
                                                    height="70px"
                                                    style={{ marginRight: '5px' }}
                                                ></img>
                                                {product.name}
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">{product.price} </TableCell>
                                        <TableCell align="center">{product.quantity} </TableCell>
                                        <TableCell align="center">{product.price * Number(product.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Stack>
                    <Stack marginTop="10px">{renderStatusOnCustomer(modalState.status)}</Stack>
                </Box>
            </Modal>

            <Modal
                open={cancelConfirmationOpen}
                onClose={() => handleCancelConfirmationClose(false)}
                aria-labelledby="cancel-confirmation-dialog-title"
                aria-describedby="cancel-confirmation-dialog-description"
            >
                <Box sx={style1}>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            marginTop={1}
                        >
                            <Typography></Typography>
                            <Typography
                                style={{ marginLeft: '50px' }}
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Lý Do Hủy Đơn Hàng
                            </Typography>
                            <IconButton onClick={handleCancelConfirmationOpen}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <RadioGroup
                                value={selectedValue}
                                onChange={handleChange}
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {cancelReasons.length > 0 &&
                                    cancelReasons.map((reasonCancel) => (
                                        <FormControlLabel
                                            key={reasonCancel.id}
                                            value={reasonCancel.id}
                                            control={<Radio />}
                                            label={reasonCancel.reason}
                                        />
                                    ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                    <div
                        style={{
                            textAlign: 'right',
                            paddingRight: '15px',
                        }}
                    >
                        <Button variant="contained" color="error" onClick={handleCancelConfirmationClose}>
                            XÁC NHẬN
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Grid>
                <Pagination
                    count={totalPage}
                    color="primary"
                    shape="rounded"
                    page={currentPage}
                    onChange={handleChangePage}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}
                />
            </Grid>
        </>
    );
}

export default OrderTab;

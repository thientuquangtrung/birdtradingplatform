import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Paper,
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
import React, { useState } from 'react';

function OrderTab({ status }) {
    const [tableData, setTableData] = useState([
        {
            name: 'Nghia dep trai',
            phone: '123',
            address: 'Vincom Grand Park',
            orderID: '123',
            customer: 'Tèo',
            quantity: 2,
            status: 'PENDING',
        },
        {
            orderID: '124',
            customer: 'Trung',
            quantity: 1,
            status: 'SUCCESSFUL',
        },
        {
            orderID: '126',
            customer: 'Nghĩa',
            quantity: 3,
            status: 'DELIVERING',
        },
        {
            orderID: '190',
            customer: 'Nam',
            quantity: 100,
            status: 'CANCELLED',
        },
    ]);
    const paperStyle = { width: '100%', margin: '20px auto' };
    const [open, setOpen] = useState(false);
    const [modalState, setModalState] = useState({});
    const handleDelivering = () => {
        const updatedTableData = tableData.map((item) => {
            if (item.orderID === modalState.orderID) {
                return { ...item, status: 'DELIVERING' };
            }
            return item;
        });
        setTableData(updatedTableData);
        handleClose();
    };
    const handleSuccessful = () => {
        const updatedTableData = tableData.map((item) => {
            if (item.orderID === modalState.orderID) {
                return { ...item, status: 'SUCCESSFUL' };
            }
            return item;
        });
        setTableData(updatedTableData);
        handleClose();
    };
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const handleCancelConfirmationClose = (confirmed) => {
        setCancelConfirmationOpen(false);
        if (confirmed) {
            const updatedTableData = tableData.map((item) => {
                if (item.orderID === modalState.orderID) {
                    return { ...item, status: 'CANCELLED' };
                }
                return item;
            });
            setTableData(updatedTableData);
            handleClose();
        }
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
        } else if (status === 'DELIVERING') {
            return <Chip label="DELIVERING" icon={<DeliveryDiningIcon />} color="info" />;
        } else if (status === 'SUCCESSFUL') {
            return <Chip label="SUCCESSFUL" icon={<DoneIcon />} color="success" />;
        } else if (status === 'CANCELLED') {
            return <Chip label="CANCELLED" icon={<CloseIcon />} color="error" />;
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
                            color="info"
                            size="small"
                            sx={{ borderRadius: '10px' }}
                            onClick={() => handleDelivering()}
                        >
                            <DeliveryDiningIcon />
                            Delivering
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
        if (status === 'DELIVERING') {
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
        if (status === 'SUCCESSFUL') {
            return (
                <Stack direction="row" justifyContent="space-between" marginTop="10px">
                    <Stack>
                        <Button onClick={handleClose}>Trở lại</Button>
                    </Stack>
                </Stack>
            );
        }
        if (status === 'CANCELLED') {
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
                                    <TableRow key={item.orderID}>
                                        <TableCell component="th" scope="row">
                                            {item.orderID}
                                        </TableCell>
                                        <TableCell>{item.customer}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
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
                            <Chip label="Mã đơn hàng: 1999" color="success" />
                        </Stack>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tên khách hàng: <span>{modalState.name}</span>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Số điện thoại: <span>{modalState.phone}</span>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Địa chỉ: <span>{modalState.address}</span>
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
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Stack direction="row" alignItems="center">
                                            <img
                                                src=""
                                                alt=""
                                                width="60px"
                                                height="60px"
                                                style={{ marginRight: '5px' }}
                                            ></img>
                                            Quần què
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center"> 2 xị</TableCell>
                                    <TableCell align="center"> 50</TableCell>
                                    <TableCell align="center"> 10 chai</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Stack direction="row" alignItems="center">
                                            <img
                                                src=""
                                                alt=""
                                                width="60px"
                                                height="60px"
                                                style={{ marginRight: '5px' }}
                                            ></img>
                                            Quần què
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center"> 2 xị</TableCell>
                                    <TableCell align="center"> 50</TableCell>
                                    <TableCell align="center"> 10 chai</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Stack>
                    <Stack marginTop="10px">{renderStatusOnCustomer(modalState.status)}</Stack>
                </Box>
            </Modal>
            <Dialog
                open={cancelConfirmationOpen}
                onClose={() => handleCancelConfirmationClose(false)}
                aria-labelledby="cancel-confirmation-dialog-title"
                aria-describedby="cancel-confirmation-dialog-description"
            >
                <DialogTitle id="cancel-confirmation-dialog-title">Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="cancel-confirmation-dialog-description">
                        Are you sure you want to cancel this order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCancelConfirmationClose(true)} color="error" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={() => handleCancelConfirmationClose(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default OrderTab;

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomNoRowsOverlay from '../components/CustomNoRowsOverlay';
import React, { useState } from 'react';
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Paper,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StoreIcon from '@mui/icons-material/Store';
import UploadImage from './UploadImage';

function CustomerOrderTab({ status }) {
    const [open, setOpen] = useState(false);
    const [upLoadFile, setUpLoadFile] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Thêm các xử lý khác nếu cần thiết để quay về trang ban đầu
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [orderId, setOrderId] = useState(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'white', // Update the background color here
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const handleCancelConfirmationOpen = (orderId) => {
        setOrderId(orderId);
        setCancelConfirmationOpen(true);
    };
    const handleCancelConfirmationClose = (confirmed) => {
        if (confirmed) {
            const updatedTableData = tableData.map((item) =>
                item.orderID === orderId ? { ...item, status: 'CANCELLED' } : item,
            );
            setTableData(updatedTableData);
        }
        setCancelConfirmationOpen(false);
    };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };
    const [tableData, setTableData] = useState([
        {
            orderID: '123',
            shopName: 'Tèo Shop',
            productName: 'Quần không què',
            quantity: 2,
            price: 1000,
            status: 'PENDING',
        },
        {
            orderID: '124',
            shopName: 'MAI Seller',
            productName: 'Quần không què với 1 cái quần què thì sẽ ra quần nhiều què hehehehehe',
            price: 1000,
            quantity: 1,
            status: 'SUCCESSFUL',
        },
        {
            orderID: '124',
            shopName: 'Trung Seller',
            productName: 'Quần không què với 1 cái quần què thì sẽ ra quần nhiều què hehehehehe',
            price: 1000,
            quantity: 1,
            status: 'DELIVERING',
        },
        {
            orderID: '124',
            shopName: 'NGAN Seller',
            productName: 'Quần không què với 1 cái quần què thì sẽ ra quần nhiều què hehehehehe',
            price: 1000,
            quantity: 1,
            status: 'CANCELLED',
        },
    ]);

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

    const paperStyle = { width: '100%', margin: '20px auto' };

    return (
        <Stack>
            <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
            >
                <TableBody>
                    {tableData.length > 0 ? (
                        tableData.map((item) => (
                            <>
                                <TableRow key={item.orderID}>
                                    <TableCell colSpan={1} sx={{ borderBottom: 'none' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <StoreIcon />
                                                <Button
                                                    variant="text"
                                                    style={{ backgroundColor: 'white', color: 'black' }}
                                                >
                                                    {item.shopName}
                                                </Button>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ borderBottom: 'none', textAlign: 'end' }}>
                                        {renderStatus(item.status)}
                                    </TableCell>
                                </TableRow>
                                <TableRow key={item.orderID}>
                                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <img width="60px" height="60px" alt="" />
                                        {item.productName}
                                    </TableCell>

                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'end' }} colSpan={5}>
                                        {item.status === 'PENDING' ? (
                                            <>
                                                <Button
                                                    onClick={() => handleCancelConfirmationOpen(item.orderID)}
                                                    variant="text"
                                                    color="error"
                                                >
                                                    Hủy Đơn Hàng
                                                </Button>
                                            </>
                                        ) : item.status === 'SUCCESSFUL' ? (
                                            <Button onClick={handleOpen}>Đánh Giá</Button>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            </>
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
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography sx={{ paddingLeft: 1, paddingBottom: 2 }} id="modal-modal-title" variant="h4">
                            Đánh Giá Sản Phẩm
                        </Typography>
                        <Box
                            sx={{
                                m: 1,
                                width: 510,
                            }}
                        >
                            <Paper variant="outlined" sx={{ backgroundColor: '#f5f5f5' }}>
                                <Stack direction="column" sx={{ paddingBottom: 3 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: 'white',
                                            m: 3,
                                            width: 460,
                                            height: 250,
                                            fontSize: 'small',
                                        }}
                                    >
                                        <TextareaAutosize
                                            // value={description}
                                            // onChange={(e) => setDescription(e.target.value)}
                                            minRows={3}
                                            placeholder="Nhập đánh giá sản phẩm"
                                            style={{
                                                padding: 10,
                                                height: '100%',
                                                width: '100%',
                                                fontSize: 15,
                                                fontFamily: 'Roboto',
                                            }}
                                        />
                                    </Paper>

                                    <UploadImage
                                        title="Select a logo"
                                        uploadFile={upLoadFile}
                                        setUploadFile={setUpLoadFile}
                                    />
                                </Stack>
                            </Paper>
                        </Box>
                        <Stack
                            justifyContent="flex-end"
                            spacing={1}
                            direction="row"
                            sx={{ marginRight: 1.8, paddingTop: 1 }}
                        >
                            <Button size="small" variant="text" onClick={handleClose}>
                                Trở Lại
                            </Button>

                            <Button size="small" variant="contained" onClick={handleClose}>
                                Hoàn Thành
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
                <Dialog
                    open={cancelConfirmationOpen}
                    onClose={handleCancelConfirmationClose}
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
            </div>
        </Stack>
    );
}

export default CustomerOrderTab;

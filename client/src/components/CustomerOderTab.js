import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomNoRowsOverlay from '../components/CustomNoRowsOverlay';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import AuthContext from '../contexts/AuthContext';
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
    const [value, setValue] = useState('1');
    const [orderId, setOrderId] = useState(null);
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tableData, setTableData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        axiosClient
            .get(`customer/order/${currentUser.id}`, {
                params: {
                    page: 1,
                    perPage: 10,
                    status,
                },
            })
            .then(function (response) {
                setTableData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
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

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
    const handleCancelConfirmationOpen = (orderId) => {
        setOrderId(orderId);
        setCancelConfirmationOpen(true);
    };
    const handleCancelConfirmationClose = (confirmed) => {
        if (confirmed) {
            const updatedTableData = tableData.map(
                (item) => (item.orderId === orderId ? { ...item, status: 'CANCELED' } : item),
                changeOrderStatus(orderId, 'CANCELED'),
            );
            setTableData(updatedTableData);
        }
        setCancelConfirmationOpen(false);
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
        }
    };

    return (
        <Stack>
            <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
            >
                <TableHead>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Giá tiền</TableCell>
                </TableHead>
                <TableBody>
                    {tableData.length > 0 ? (
                        tableData.map((item) => (
                            <>
                                <TableRow key={item.orderId}>
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
                                                    {item.shop.name}
                                                </Button>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ borderBottom: 'none', textAlign: 'end' }}>
                                        {renderStatus(item.status)}
                                    </TableCell>
                                </TableRow>
                                {item.products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <img src={product.image} width="70px" height="70px" alt="" />
                                            {product.name}
                                        </TableCell>

                                        <TableCell align="center">x{product.quantity}</TableCell>
                                        <TableCell align="right">{product.price.toLocaleString('vi-VN')}₫</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell sx={{ textAlign: 'end' }} colSpan={5}>
                                        {item.status === 'PENDING' ? (
                                            <>
                                                <Button
                                                    onClick={() => handleCancelConfirmationOpen(item.orderId)}
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: '#fafafa',
                                                        color: '#616161',
                                                        fontWeight: '420',
                                                        textTransform: 'none',
                                                        boxShadow: '2px',
                                                        border: '1px solid #9e9e9e',
                                                    }}
                                                >
                                                    Hủy Đơn Hàng
                                                </Button>
                                            </>
                                        ) : item.status === 'COMPLETED' ? (
                                            <Button variant="contained" onClick={handleOpen}>
                                                Đánh Giá
                                            </Button>
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
                            Bạn có chắc chắn muốn hủy đơn hàng không
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCancelConfirmationClose(true)} color="error" autoFocus>
                            Có
                        </Button>
                        <Button onClick={() => handleCancelConfirmationClose(false)} color="primary">
                            Không
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Stack>
    );
}

export default CustomerOrderTab;

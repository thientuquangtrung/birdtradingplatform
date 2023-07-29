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
import AllInboxIcon from '@mui/icons-material/AllInbox';
import {
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
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { Box, Stack, border } from '@mui/system';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StoreIcon from '@mui/icons-material/Store';
import UploadImage from './UploadImage';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import handleError from '../utils/handleError';

function CustomerOrderTab({ status }) {
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const [open, setOpen] = useState(false);
    const [upLoadFile, setUpLoadFile] = useState(null);
    const [feedbackContent, setFeedbackContent] = useState('');
    const [modalState, setModalState] = useState(null);

    const [orderId, setOrderId] = useState(null);
    const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState(0);
    const [cancelReasons, setCancelReasons] = useState([]);
    const isDisabled = () => {
        if (feedbackContent === '' || upLoadFile === '') {
            return true;
        }
        return false;
    };
    useEffect(() => {
        axiosClient
            .get('order/cancel_reason', {
                params: {
                    role: 'CUSTOMER',
                },
            })
            .then((response) => {
                // console.log(response);
                setCancelReasons(response.data.data);
            })
            .catch((error) => {
                handleError(error);
            });
    }, []);

    useEffect(() => {
        axiosClient
            .get(`customer/order/${currentUser.id}`, {
                params: {
                    page: currentPage,
                    perPage: 10,
                    status,
                },
            })
            .then(function (response) {
                setTableData(response.data.data);
                setTotalPage(response.data.meta.totalPages);
                setCurrentPage(response.data.meta.currentPage);
            })
            .catch(function (error) {
                handleError(error);
            });
    }, [currentPage]);

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
                handleError(error);
            });
    };
    const sendCancelRequest = (orderId) => {
        console.log('Da send');
    };
    const handleOpen = (item) => {
        setModalState(item);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'white', // Update the background color here
        border: 'none',
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
    };

    const handleCancelConfirmationOpen = (orderId) => {
        setOrderId(orderId);
        setCancelConfirmationOpen(true);
    };

    const handleCancelConfirmationOpen1 = () => {
        setCancelConfirmationOpen(false);
    };

    const handleCancelConfirmationClose = (confirmed) => {
        if (confirmed) {
            const updatedTableData = tableData.map((item) => {
                if (item.orderId === orderId) {
                    if (item.status === 'PENDING') {
                        cancelOrder(orderId);
                        return { ...item, status: 'CANCELED' };
                    } else if (item.status === 'PICKUP') {
                        sendCancelRequest(orderId);
                        return item;
                    }
                } else {
                    return item;
                }
            });
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
        } else if (status === 'PICKUP') {
            return <Chip label="PICKUP" icon={<AllInboxIcon />} sx={{ color: 'white', backgroundColor: '#ffef62' }} />;
        }
    };

    function handleSubmitFeedback() {
        const formData = new FormData();
        formData.append('content', feedbackContent);
        formData.append('image', upLoadFile);
        formData.append('orderId', modalState.orderId);
        axiosClient
            .post('feedback', formData)
            .then((response) => {
                enqueueSnackbar('Đã feedback thành công', {
                    variant: 'success',
                });
                handleClose();
            })
            .catch((error) => {
                handleError(error);
            });
    }

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
                                    <TableRow sx={{ border: 'none' }} key={product.id}>
                                        <TableCell
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '20px',
                                                border: 'none',
                                                margin: '2px 0',
                                            }}
                                        >
                                            <img src={product.image} width="70px" height="70px" alt="" />
                                            {product.name}
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', margin: '2px 0' }} align="center">
                                            x{product.quantity}
                                        </TableCell>
                                        <TableCell sx={{ border: 'none', margin: '2px 0' }} align="right">
                                            {product.price.toLocaleString('vi-VN')}₫
                                        </TableCell>
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
                                        ) : item.status === 'PICKUP' ? (
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
                                            <Button
                                                disabled={item.feedback !== null}
                                                variant="contained"
                                                onClick={() => handleOpen(item)}
                                                sx={{
                                                    backgroundColor: '#43a99c',
                                                    '&:hover': {
                                                        backgroundColor: '#43a99c',
                                                    },
                                                }}
                                            >
                                                {item.feedback
                                                    ? `Đã đánh giá vào: ${dayjs(item.feedback, 'YYYY-MM-DD').format(
                                                          'DD/MM/YYYY',
                                                      )}`
                                                    : `Đánh giá`}
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
                                        value={feedbackContent}
                                        onChange={(e) => setFeedbackContent(e.target.value)}
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
                        <Button
                            size="small"
                            variant="text"
                            sx={{
                                color: '#43a99c',
                            }}
                            onClick={handleClose}
                        >
                            Trở Lại
                        </Button>

                        <Button
                            size="small"
                            variant="contained"
                            disabled={isDisabled()}
                            sx={{
                                backgroundColor: '#43a99c',
                                '&:hover': {
                                    backgroundColor: '#43a99c',
                                },
                            }}
                            onClick={handleSubmitFeedback}
                        >
                            {' '}
                            Hoàn Thành
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal
                open={cancelConfirmationOpen}
                onClose={() => handleCancelConfirmationClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography></Typography>
                            <Typography
                                style={{ marginLeft: '50px', marginTop: '10px' }}
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Chọn lý do hủy
                            </Typography>
                            <IconButton onClick={handleCancelConfirmationOpen1}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <FormControl>
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
                        <Button
                            disabled={selectedValue === 0}
                            variant="contained"
                            color="error"
                            onClick={handleCancelConfirmationClose}
                        >
                            XÁC NHẬN
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Grid>
                <Pagination
                    count={totalPage}
                    shape="rounded"
                    page={currentPage}
                    onChange={handleChangePage}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}
                    sx={{
                        '& .Mui-selected': {
                            color: 'black',
                        },
                    }}
                />
            </Grid>
        </Stack>
    );
}

export default CustomerOrderTab;

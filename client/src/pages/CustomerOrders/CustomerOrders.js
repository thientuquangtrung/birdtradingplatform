import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import {
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Pagination,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import SubCustomerLayout from '../../layouts/SubCustomerLayout/SubCustomerLayout';

import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import UploadImage from '../../components/UploadImage';
import CustomerOrderTab from '../../components/CustomerOderTab';

function CustomerOrders() {
    const [open, setOpen] = useState(false);
    const [upLoadFile, setUpLoadFile] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <SubCustomerLayout>
            <Paper sx={{ flex: '1', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                            <Tab label="Tất cả" value="1" />
                            <Tab label="Chờ xác nhận" value="2" />
                            <Tab label="Chờ lấy hàng" value="3" />
                            <Tab label="Đang giao" value="4" />
                            <Tab label="Hoàn thành" value="5" />
                            <Tab label="Đã hủy" value="6" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CustomerOrderTab></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="2">
                        <CustomerOrderTab status="PENDING"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="3">
                        <CustomerOrderTab status="PICKUP"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="4">
                        <CustomerOrderTab status="SHIPPING"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="5">
                        <CustomerOrderTab status="COMPLETED"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="6">
                        <CustomerOrderTab status="CANCELED"></CustomerOrderTab>
                    </TabPanel>
                    {/* <div>
                        <Button onClick={handleOpen}>Open modal</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Stack direction="column" alignItems="center" spacing={2}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        width="100%"
                                    >
                                        <Typography></Typography>
                                        <Typography
                                            style={{ marginLeft: '50px' }}
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            Chọn lý do hủy
                                        </Typography>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Stack>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                            
                                        >
                                            <FormControlLabel
                                                value="address"
                                                control={<Radio />}
                                                label="Muốn thay đổi địa chỉ giao hàng"
                                            />
                                            <FormControlLabel
                                                value="amount"
                                                control={<Radio />}
                                                label="Muốn thay đổi số lượng sản phẩm trong đơn hàng"
                                            />
                                            <FormControlLabel
                                                value="another"
                                                control={<Radio />}
                                                label="Tìm thấy shop khác bán rẻ hơn"
                                            />
                                            <FormControlLabel
                                                value="newshop"
                                                control={<Radio />}
                                                label="Đổi ý, không muốn mua nữa"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button variant="contained" onClick={handleClose} sx={{ width: '100%' }}>
                                        ĐỒNG Ý
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </div> */}
                </TabContext>
            </Paper>
        </SubCustomerLayout>
    );
}

export default CustomerOrders;

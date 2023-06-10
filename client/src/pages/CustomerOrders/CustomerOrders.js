import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, ImageList, ImageListItem, Paper, Stack, TextareaAutosize } from '@mui/material';
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
        // Thêm các xử lý khác nếu cần thiết để quay về trang ban đầu
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    return (
        <SubCustomerLayout>
            <Paper sx={{ flex: '1', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                            <Tab label="Tất cả" value="1" />
                            <Tab label="Chờ xử lí" value="2" />
                            <Tab label="Đang giao" value="3" />
                            <Tab label="Hoàn thành" value="4" />
                            <Tab label="Đã hủy" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CustomerOrderTab></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item Four</TabPanel>
                    <TabPanel value="5">Item Five</TabPanel>
                </TabContext>

                <div>
                    <Button onClick={handleOpen}>Đánh Giá</Button>
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
                                            title="Chọn ảnh"
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
                </div>
            </Paper>
        </SubCustomerLayout>
    );
}

export default CustomerOrders;

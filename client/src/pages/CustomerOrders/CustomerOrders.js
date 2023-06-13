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
                    <TabPanel value="2">
                        <CustomerOrderTab status="PENDING"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="3">
                        <CustomerOrderTab status="SHIPPING"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="4">
                        <CustomerOrderTab status="COMPLETED"></CustomerOrderTab>
                    </TabPanel>
                    <TabPanel value="5">
                        <CustomerOrderTab status="CANCELED"></CustomerOrderTab>
                    </TabPanel>
                </TabContext>
            </Paper>
        </SubCustomerLayout>
    );
}

export default CustomerOrders;

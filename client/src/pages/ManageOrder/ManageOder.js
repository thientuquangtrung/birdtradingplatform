import React, { useState } from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import { Button, IconButton, InputBase, MenuItem, Paper, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import OrderTab from '../../components/OrderTab';

const ManageOrder = () => {
    const [value, setValue] = useState('1');
    // const [selectedType, setSelectedType] = useState('Mã đơn hàng');
    // const [inputValue, setInputValue] = useState('');

    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Stack>
            <TabContext value={value}>
                <Paper sx={{ borderBottom: 1, borderColor: 'divider', mb: '24px' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Chờ xác nhận" value="2" />
                        <Tab label="Đang giao" value="4" />
                        <Tab label="Hoàn thành" value="5" />
                        <Tab label="Đã hủy" value="6" />
                    </TabList>
                </Paper>
                <div style={{ margin: '-24px' }}>
                    <TabPanel value="1">
                        <OrderTab></OrderTab>
                    </TabPanel>
                    <TabPanel value="2">
                        <OrderTab status="PENDING"></OrderTab>
                    </TabPanel>
                    <TabPanel value="4">
                        <OrderTab status="SHIPPING"></OrderTab>
                    </TabPanel>
                    <TabPanel value="5">
                        <OrderTab status="COMPLETED"></OrderTab>
                    </TabPanel>
                    <TabPanel value="6">
                        <OrderTab status="CANCELED"></OrderTab>
                    </TabPanel>
                </div>
            </TabContext>
        </Stack>
    );
};

export default ManageOrder;

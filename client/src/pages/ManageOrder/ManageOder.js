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

    // const handleTypeChange = (event) => {
    //     setSelectedType(event.target.value);
    // };

    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    // const type = [
    //     {
    //         value: 'Mã đơn hàng',
    //         label: 'Mã đơn hàng',
    //     },
    //     {
    //         value: 'Tên người mua',
    //         label: 'Tên người mua',
    //     },
    // ];

    return (
        <Stack>
            <TabContext value={value}>
                <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                {/* <Stack marginTop={5} height="50px" direction="row" alignItems="center">
                    <TextField
                        id="outlined-select-currency"
                        select
                        label={selectedType}
                        value={selectedType}
                        onChange={handleTypeChange}
                        sx={{ width: '200px' }}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Stack height="100%" bgcolor="white" direction="row" flex={5} borderRadius marginRight="20px">
                        <InputBase
                            sx={{ ml: 1, flex: 1, height: '100%' }}
                            placeholder={`Nhập ${selectedType}`}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <IconButton type="button" aria-label="search" onClick={handleSearch}>
                            <Search />
                        </IconButton>
                    </Stack>
                    <Button
                        sx={{ height: '100%', backgroundColor: '#43a99c' }}
                        variant="contained"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </Stack> */}
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
            </TabContext>
        </Stack>
    );
};

export default ManageOrder;

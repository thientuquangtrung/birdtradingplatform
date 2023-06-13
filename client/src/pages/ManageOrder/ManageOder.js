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
    const totalItems = 100;
    const itemsPerPage = 10;
    const totalPage = Math.ceil(totalItems / itemsPerPage);
    // const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const [value, setValue] = useState('1');
    const [selectedType, setSelectedType] = useState('Mã đơn hàng');
    const [inputValue, setInputValue] = useState('');

    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        if (inputValue === '') {
            enqueueSnackbar('Type something to search', { variant: 'info' });
            return;
        }
    };

    const type = [
        {
            value: 'Mã đơn hàng',
            label: 'Mã đơn hàng',
        },
        {
            value: 'Tên người mua',
            label: 'Tên người mua',
        },
    ];

    return (
        <Stack>
            <TabContext value={value}>
                <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Chờ xác nhận" value="2" />
                        <Tab label="Đang giao" value="3" />
                        <Tab label="Giao thành công" value="4" />
                        <Tab label="Đơn hủy" value="5" />
                    </TabList>
                </Paper>
                <Stack marginTop={5} height="50px" direction="row" alignItems="center">
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
                    <Button sx={{ height: '100%' }} variant="contained" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Stack>
                <TabPanel value="1">
                    <OrderTab />
                </TabPanel>
                <TabPanel value="2">
                    <OrderTab status="PENDING" />
                </TabPanel>
                <TabPanel value="3">
                    <OrderTab status="SHIPPING" />
                </TabPanel>
                <TabPanel value="4">
                    <OrderTab status="COMPLETED" />
                </TabPanel>
                <TabPanel value="5">
                    <OrderTab status="CANCELED" />
                </TabPanel>
            </TabContext>
            <Grid>
                <Pagination
                    count={totalPage}
                    color="primary"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}
                />
            </Grid>
        </Stack>
    );
};

export default ManageOrder;

import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Button, IconButton, InputBase, MenuItem, Paper, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay';

const ManageOrder = () => {
    const [value, setValue] = useState('1');
    const [selectedType, setSelectedType] = useState('Mã đơn hàng');
    const [inputValue, setInputValue] = useState('');
    const [itemCount, setItemCount] = useState(0); // State for item count
    const paperStyle = { padding: 20, width: '100%', margin: '20px auto' };
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
            value: 'Sản phẩm',
            label: 'Sản phẩm',
        },
        {
            value: 'Tên người mua',
            label: 'Tên người mua',
        },
    ];

    const [tableData, setTableData] = useState([]); // State for table data

    // Calculate the item count
    const calculateItemCount = () => {
        let count = 0;
        tableData.forEach((item) => {
            count += item.quantity;
        });
        return count;
    };

    // Update the item count whenever the tableData changes
    React.useEffect(() => {
        setItemCount(calculateItemCount());
    }, [tableData]);

    return (
        <Stack>
            <TabContext value={value}>
                <Paper sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Chờ xác nhận" value="2" />
                        <Tab label="Đã giao" value="3" />
                        <Tab label="Đơn hủy" value="4" />
                    </TabList>
                </Paper>
                <TabPanel value="1">
                    <Stack direction="row" alignItems="center">
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
                        <Stack height={50} bgcolor="white" direction="row" flex={5} borderRadius marginRight="20px">
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder={`Nhập ${selectedType}`}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                                <Search />
                            </IconButton>
                        </Stack>
                        <Button variant="contained" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </Stack>
                    <Stack>Count: {itemCount}</Stack>
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
                                        <TableCell>Hình ảnh</TableCell>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell align="center">Tổng đơn hàng</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.length > 0 ? (
                                        tableData.map((item) => (
                                            <TableRow key={item.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={item.imageUrl} width="60px" height="60px" alt="" />
                                                </TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell align="center">{item.price}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.total}</TableCell>
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
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
            </TabContext>
        </Stack>
    );
};

export default ManageOrder;

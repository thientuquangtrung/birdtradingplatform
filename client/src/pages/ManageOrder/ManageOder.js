import React, { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { Button, IconButton, InputBase, MenuItem, Paper, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomNoRowsOverlay from '../../components/CustomNoRowsOverlay';
import AuthContext from '../../contexts/AuthContext';
const Actions = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { currentUser } = useContext(AuthContext);

    return (
        <Stack direction="row" spacing={0.5} justifyContent="center">
            <React.Fragment>
                <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
                    <VisibilityIcon></VisibilityIcon>
                </IconButton>
                <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
                    <EditIcon></EditIcon>
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Bạn muốn thay đổi trạng thái đơn hàng?'}</DialogTitle>

                    <DialogActions>
                        <Button onClick={handleClose}>Không</Button>
                        <Button>Có</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Stack>
    );
};
const ManageOrder = () => {
    const [value, setValue] = useState('1');
    const [selectedType, setSelectedType] = useState('Mã đơn hàng');
    const [inputValue, setInputValue] = useState('');
    const paperStyle = { width: '100%', margin: '20px auto' };
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

    const tableData = [
        {
            imageUrl: 'image-url-1',
            productName: 'Product 1',
            quantity: 2,
            status: 'z',
        },
        {
            imageUrl: 'image-url-2',
            productName: 'Product 2',
            quantity: 1,
            status: 'Pending',
        },
        {
            imageUrl: 'image-url-3',
            productName: 'Product 3',
            quantity: 3,
            status: 'Cancelled',
        },
        {
            imageUrl: 'image-url-1',
            productName: 'Product 4',
            quantity: 100,
            status: 'Cancelled',
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
                <TabPanel value="1">
                    <Stack direction="row" alignItems="center">
                        <Stack>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label={selectedType}
                                value={selectedType}
                                onChange={handleTypeChange}
                                sx={{ width: '200px', height: '46px', padding: '0px' }}
                            >
                                {type.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <Stack height={50} bgcolor="white" direction="row" flex={5} borderRadius marginRight="20px">
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder={`Nhập ${selectedType}`}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <IconButton type="button" aria-label="search" onClick={handleSearch}>
                                <Search />
                            </IconButton>
                        </Stack>
                        <Button sx={{ height: '50px' }} variant="contained" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </Stack>
                    <Stack>
                        <div style={{ fontWeight: '550', marginTop: '20px' }}>{tableData.length} Đơn hàng</div>
                    </Stack>
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
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.status}</TableCell>
                                                <TableCell>
                                                    <Actions data={item} />
                                                </TableCell>
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
                <TabPanel value="2">
                    <div style={{ fontWeight: '550', marginTop: '20px' }}>
                        {tableData.filter((item) => item.status === 'Pending').length} Đơn hàng{' '}
                    </div>

                    <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
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
                                {tableData.filter((item) => item.status === 'Pending').length > 0 ? (
                                    tableData
                                        .filter((item) => item.status === 'Pending')
                                        .map((item) => (
                                            <TableRow key={item.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={item.imageUrl} width="60px" height="60px" alt="" />
                                                </TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.status}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5} justifyContent="center">
                                                        <IconButton color="primary" aria-label="view">
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" aria-label="edit">
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
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
                </TabPanel>

                <TabPanel value="3">
                    <div style={{ fontWeight: '550', marginTop: '20px' }}>
                        {tableData.filter((item) => item.status === 'Delivering').length} Đơn hàng{' '}
                    </div>

                    <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" NoRowsOverlay={CustomNoRowsOverlay}>
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
                                {tableData.filter((item) => item.status === 'Delivering').length > 0 ? (
                                    tableData
                                        .filter((item) => item.status === 'Delivering')
                                        .map((item) => (
                                            <TableRow key={item.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={item.imageUrl} width="60px" height="60px" alt="" />
                                                </TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.status}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5} justifyContent="center">
                                                        <IconButton color="primary" aria-label="view">
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" aria-label="edit">
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
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
                </TabPanel>
                <TabPanel value="4">
                    <div style={{ fontWeight: '550', marginTop: '20px' }}>
                        {tableData.filter((item) => item.status === 'Successful').length} Đơn hàng{' '}
                    </div>

                    <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
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
                                {tableData.filter((item) => item.status === 'Successful').length > 0 ? (
                                    tableData
                                        .filter((item) => item.status === 'Successful')
                                        .map((item) => (
                                            <TableRow key={item.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={item.imageUrl} width="60px" height="60px" alt="" />
                                                </TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.status}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5} justifyContent="center">
                                                        <IconButton color="primary" aria-label="view">
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" aria-label="edit">
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
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
                </TabPanel>
                <TabPanel value="5">
                    <div style={{ fontWeight: '550', marginTop: '20px' }}>
                        {tableData.filter((item) => item.status === 'Cancelled').length} Đơn hàng{' '}
                    </div>

                    <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
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
                                {tableData.filter((item) => item.status === 'Cancelled').length > 0 ? (
                                    tableData
                                        .filter((item) => item.status === 'Cancelled')
                                        .map((item) => (
                                            <TableRow key={item.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={item.imageUrl} width="60px" height="60px" alt="" />
                                                </TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.status}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={0.5} justifyContent="center">
                                                        <IconButton color="primary" aria-label="view">
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" aria-label="edit">
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
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
                </TabPanel>
            </TabContext>
        </Stack>
    );
};

export default ManageOrder;

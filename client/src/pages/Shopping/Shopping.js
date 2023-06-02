import { Box, Button, Grid, ListItemButton, MenuItem, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';
import axiosClient from '../../api/axiosClient';
import CheckIcon from '@mui/icons-material/Check';

const priceOption = [
    {
        value: 'asc',
        label: 'Giá: Thấp đến Cao',
    },
    {
        value: 'desc',
        label: 'Giá: Cao đến Thấp',
    },
];

function Shopping() {
    const location = useLocation();
    const [listProduct, setListProduct] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(function () {
        axiosClient
            .get('/category')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(
        function () {
            setSortBy('');
            setOrder('');

            if (location.state?.q) {
                axiosClient
                    .get('product/search', {
                        params: {
                            q: location.state.q,
                            page,
                        },
                    })
                    .then(function (response) {
                        // handle success
                        setListProduct(response.data.data);
                        setTotalPage(response.data.meta.pagination.totalPages);
                        setPage(response.data.meta.pagination.currentPage);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                return;
            }

            if (location.state?.categoryId) {
                axiosClient
                    .get(`/product/category/${location.state.categoryId}`, {
                        params: {
                            page,
                        },
                    })
                    .then((response) => {
                        setListProduct(response.data.data);
                        setTotalPage(response.data.meta.pagination.totalPages);
                        setPage(response.data.meta.pagination.currentPage);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }

            axiosClient
                .get('/product', {
                    params: {
                        page,
                    },
                })
                .then((response) => {
                    setListProduct(response.data.data);
                    setTotalPage(response.data.meta.pagination.totalPages);
                    setPage(response.data.meta.pagination.currentPage);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [location.state, page],
    );

    useEffect(() => {
        axiosClient
            .get('/product/filter', {
                params: {
                    categoryId: location.state?.categoryId,
                    q: location.state?.q,
                    sortBy,
                    order,
                    page,
                },
            })
            .then((response) => {
                setListProduct(response.data.data);
                setTotalPage(response.data.meta.pagination.totalPages);
                setPage(response.data.meta.pagination.currentPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortBy, order]);

    function handleFilter(option, order = 'asc') {
        setSortBy(option);
        setOrder(order);
    }

    return (
        <Grid container spacing={1.5}>
            <Grid item xs={2} marginTop={0.4}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div" sx={{ padding: 0.5 }}>
                                Danh mục
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                    {categoryList.length > 0 &&
                        categoryList.map((category) => {
                            return (
                                <Link
                                    to={`/shopping/${category.name}`}
                                    key={category.id}
                                    state={{
                                        categoryId: category.id,
                                    }}
                                >
                                    <ListItemButton
                                        sx={{ pt: 1, pb: 1 }}
                                        selected={location.state?.categoryId === category.id}
                                        divider
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                </List>
            </Grid>
            <Grid item xs={10}>
                <Paper>
                    {/* <Divider variant="middle" /> */}
                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                            alignItems="center"
                            paddingLeft={1}
                        >
                            <Box sx={{ p: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Typography marginRight={1} variant="body1">
                                        Sắp xếp theo:
                                    </Typography>

                                    <Button
                                        startIcon={sortBy === 'newest' ? <CheckIcon /> : ''}
                                        variant={sortBy === 'newest' ? 'contained' : 'outlined'}
                                        onClick={() => handleFilter('newest')}
                                    >
                                        Mới Nhất
                                    </Button>

                                    <Button
                                        startIcon={sortBy === 'sales' ? <CheckIcon /> : ''}
                                        variant={sortBy === 'sales' ? 'contained' : 'outlined'}
                                        onClick={() => handleFilter('sales')}
                                    >
                                        Bán Chạy
                                    </Button>

                                    <TextField
                                        value={sortBy === 'price' ? order : ''}
                                        size="small"
                                        select
                                        label="Giá"
                                        sx={{ minWidth: 200 }}
                                        onChange={(e) => handleFilter('price', e.target.value)}
                                    >
                                        {priceOption.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
                <Grid sx={{ paddingTop: 3 }} container spacing={1.5}>
                    {listProduct.map(function (product) {
                        return (
                            <Grid item xs={2.4} key={product.id}>
                                <ProductCard data={product} />
                            </Grid>
                        );
                    })}
                </Grid>
                {totalPage > 0 && (
                    <Pagination
                        count={totalPage}
                        color="primary"
                        shape="rounded"
                        page={page}
                        onChange={handleChange}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Shopping;

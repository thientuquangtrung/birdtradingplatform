import { Box, Button, Grid, ListItemButton, MenuItem, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';
import axiosClient from '../../api/axiosClient';
import CheckIcon from '@mui/icons-material/Check';
import ShopProduct from '../../components/ShopProduct';

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
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

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
            <ShopProduct />
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
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Shopping;

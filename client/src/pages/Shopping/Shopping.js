import { Box, Button, Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
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
    const [q, setQ] = useState(() => location.state?.q || '');
    const [categoryId, setCategoryId] = useState(() => location.state?.categoryId || 0);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (location.state?.q) setQ(location.state.q);
        if (location.state?.categoryId) setCategoryId(location.state.categoryId);
    }, [location.state]);

    useEffect(() => {
        axiosClient
            .get('/product/search', {
                params: {
                    categoryId,
                    q,
                    sortBy,
                    order,
                    page,
                },
            })
            .then((response) => {
                const list = response.data.data.flatMap((document) => document.value);
                setListProduct((prev) => [...list]);
                setTotalPage(response.data.meta.totalPages);
                setPage(response.data.meta.currentPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortBy, order, categoryId, q, page]);

    const clearAllFilters = () => {
        setCategoryId(0);
        setPage(1);
        setQ('');
        setSortBy('');
        setOrder('');
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

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
                                        sx={{
                                            color: '#3a988c',
                                            borderColor: '#43a99c',
                                            '&:hover': {
                                                borderColor: '#43a99c',
                                            },
                                        }}
                                        startIcon={sortBy === 'timestamp' ? <CheckIcon /> : ''}
                                        variant={sortBy === 'timestamp' ? 'contained' : 'outlined'}
                                        onClick={() => handleFilter('timestamp')}
                                    >
                                        Mới Nhất
                                    </Button>

                                    <Button
                                        sx={{
                                            color: '#43a99c',
                                            borderColor: '#43a99c',
                                            '&:hover': {
                                                borderColor: '#43a99c',
                                            },
                                        }}
                                        startIcon={sortBy === 'sold' ? <CheckIcon /> : ''}
                                        variant={sortBy === 'sold' ? 'contained' : 'outlined'}
                                        onClick={() => handleFilter('sold', 'desc')}
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
                    {listProduct.length > 0 &&
                        listProduct.map(function (product) {
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
                        shape="rounded"
                        page={page}
                        onChange={handleChange}
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}
                        sx={{
                            '& .Mui-selected': {
                                color: 'black',
                            },
                        }}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Shopping;

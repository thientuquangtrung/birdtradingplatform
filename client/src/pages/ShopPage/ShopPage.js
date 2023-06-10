import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Button, Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';
import axiosClient from '../../api/axiosClient';
import CheckIcon from '@mui/icons-material/Check';
import ShopProduct from '../../components/ShopProduct';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

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

function ShopPage() {
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
        <Box>
            <Paper elevation={0}  square sx={{ alignItems: 'center', backgroundColor: '#d2e1f8' }}>
                <Grid container spacing={2} padding={3} sx={{ alignItems: 'center' }}>
                    <Grid item xs={1}>
                        <Avatar
                            sx={{ width: 70, height: 70, border: '2px solid #bec0d8' }}
                            alt=""
                            src="https://s1.media.ngoisao.vn/resize_580/news/2022/04/19/4da578dae741291f7050-ngoisaovn-w1126-h1612.jpg"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#791f1f' }} fontWeight={'bold'}>
                            Zenme VietNam
                        </Typography>
                        <Stack direction="row" gap={1}>
                            <StorefrontIcon />
                            <Typography variant="subtitle1" gutterBottom>
                                Sản phẩm: <span style={{ color: '#791f1f' }}>74</span>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction="row" gap={1}>
                            <Divider orientation="vertical" flexItem />
                            <Typography variant="h6" alignItems="center" fontStyle="italic" fontWeight="inherit" marginLeft='30px'>
                                Not only does my resume look impressive—filled with the names and logos of world-class
                                institutions—but these certificates also bring me closer to my career goals by
                                validating the skills I've learned.
                            </Typography>

                            <FormatQuoteIcon fontSize="large" sx={{ width: '5%' }} />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={1.5} marginTop={2}>
                <ShopProduct />
                <Grid item xs={10}>
                    <Paper variant="outlined">
                        <Box
                            sx={{
                                padding: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5}>
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
                            <Paper variant="outlined">
                                <InputBase placeholder="Tìm trong Shop này" sx={{ paddingLeft: 1 }} />
                                <IconButton type="button" aria-label="search" size="small">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
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
        </Box>
    );
}

export default ShopPage;

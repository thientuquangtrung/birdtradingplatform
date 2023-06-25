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
import ChatButtonShop from '../../components/ChatButtonShop';

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
    const [q, setQ] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [shopInfo, setShopInfo] = useState(null);

    useEffect(() => {
        if (location.state?.categoryId) setCategoryId(location.state.categoryId);
    }, [location.state]);

    useEffect(() => {
        axiosClient
            .get(`/auth/account/${location.state?.shopId}`, {
                params: {
                    role: 'SELLER',
                },
            })
            .then(function (response) {
                setShopInfo(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        axiosClient
            .get(`/product/search/${location.state.shopId}`, {
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
                setListProduct(list);
                setTotalPage(response.data.meta.totalPages);
                setPage(response.data.meta.currentPage);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortBy, order, categoryId, q, page, location.state]);

    function handleFilter(option, order = 'asc') {
        setSortBy(option);
        setOrder(order);
    }

    return (
        <Box>
            {shopInfo && (
                <Paper elevation={0} sx={{ alignItems: 'center', backgroundColor: '#f5f5f5', padding: '3px' }}>
                    <Grid container spacing={2} padding={3} sx={{ alignItems: 'center' }}>
                        <Grid item xs={1}>
                            <Avatar
                                sx={{ width: 70, height: 70, border: '2px solid #1976d242' }}
                                alt=""
                                src={shopInfo?.image}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }} fontWeight={'bold'}>
                                {shopInfo?.name}
                            </Typography>
                            <ChatButtonShop />
                        </Grid>
                        <Grid item xs={9}>
                            <Stack direction="row" gap={1}>
                                <Divider orientation="vertical" flexItem />
                                <Typography
                                    variant="h6"
                                    alignItems="center"
                                    fontStyle="italic"
                                    fontWeight="inherit"
                                    marginLeft="30px"
                                >
                                    {shopInfo?.description}
                                </Typography>

                                <FormatQuoteIcon fontSize="large" sx={{ width: '5%' }} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            <Grid container spacing={1.5} marginTop={2}>
                <ShopProduct link={`/shop/${shopInfo?.name}`} state={location.state?.shopId} />
                <Grid item xs={10}>
                    <Paper>
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
                                    startIcon={sortBy === 'name' ? <CheckIcon /> : ''}
                                    variant={sortBy === 'name' ? 'contained' : 'outlined'}
                                    onClick={() => handleFilter('name')}
                                >
                                    Mới Nhất
                                </Button>

                                <Button
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
                            <Paper variant="outlined" sx={{ paddingRight: 1 }}>
                                <IconButton type="button" aria-label="search" size="small">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    placeholder="Tìm trong Shop này"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                />
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

import { Box, Button, Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';
import axiosClient from '../../api/axiosClient';

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

    function handleFilter(option, order = 'asc') {
        axiosClient
            .get('/product/filter', {
                params: {
                    categoryId: location.state?.categoryId,
                    q: location.state?.q,
                    sortBy: option,
                    order,
                },
            })
            .then((response) => {
                setListProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
            if (location.state?.list) {
                setListProduct(location.state.list);
            }

            if (location.state?.categoryId) {
                axiosClient
                    .get(`/product/category/${location.state.categoryId}`)
                    .then((response) => {
                        setListProduct(response.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        [location.state],
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} marginTop={1.8}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div" sx={{ padding: 0.5 }}>
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
                                    <ListItem button divider>
                                        <ListItemText primary={category.name} />
                                    </ListItem>
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
                            padding={1}
                        >
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Typography marginRight={1} variant="body1">
                                        Sắp xếp theo
                                    </Typography>

                                    <Button variant="contained" onClick={() => handleFilter('newest')}>
                                        Mới Nhất
                                    </Button>

                                    <Button variant="contained" onClick={() => handleFilter('sales')}>
                                        Bán Chạy
                                    </Button>

                                    <TextField
                                        select
                                        label="Giá"
                                        sx={{ width: 300 }}
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
                        return <ProductCard key={product.id} data={product} />;
                    })}
                </Grid>
                <Pagination
                    count={10}
                    color="primary"
                    shape="rounded"
                    style={{ display: 'flex', justifyContent: 'center' }}
                />
            </Grid>
        </Grid>
    );
}

export default Shopping;

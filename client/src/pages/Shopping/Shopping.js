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
        //kiểm tra xem location.state?.q và location.state?.categoryId có tồn tại hay không. 
        //Nếu tồn tại, chúng ta cập nhật giá trị của q và categoryId bằng cách gọi setQ(location.state.q) 
        //và setCategoryId(location.state.categoryId) tương ứng.
        if (location.state?.q) setQ(location.state.q);
        if (location.state?.categoryId) setCategoryId(location.state.categoryId);
    }, [location.state]); //hàm useEffect sẽ được gọi lại mỗi khi giá trị của location.state thay đổi.

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
                // tạo một danh sách (list) từ dữ liệu nhận được từ API 
                //bằng cách sử dụng phương thức flatMap để nối các giá trị từ mảng response.data.data. 
                setListProduct((prev) => [...list]);
                //cập nhật giá trị của biến state listProduct 
                //bằng cách thêm list vào cuối danh sách hiện tại (prev) bằng cách sử dụng toán tử spread [...list]. 
                setTotalPage(response.data.meta.totalPages);
                setPage(response.data.meta.currentPage);
                //cập nhật giá trị của totalPage và page từ thông tin meta của response.data.
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortBy, order, categoryId, q, page]);// gọi lại khi các biến này thay đổi

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
                                        color='success'
                                        startIcon={sortBy === 'timestamp' ? <CheckIcon /> : ''}
                                        variant={sortBy === 'timestamp' ? 'contained' : 'outlined'}
                                        onClick={() => handleFilter('timestamp')}
                                    >
                                        Mới Nhất
                                    </Button>

                                    <Button
                                        color='success'
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

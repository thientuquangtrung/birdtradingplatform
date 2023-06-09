import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ProductTable from '../../components/ProductTable';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import CategoryList from '../../components/CategoryList';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

function ListProduct() {
    const [categoryId, setCategoryId] = useState('');
    const [listProduct, setListProduct] = useState([]);
    const [productName, setProductName] = useState([]);

    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearchProduct();
        }
    };
    useEffect(() => {
        axiosClient
            .get('seller/product')
            .then(function (response) {
                // handle success
                setListProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    function handleSearchProduct() {
        axiosClient
            .get('seller/product/search', {
                params: {
                    categoryId: categoryId,
                    q: productName,
                },
            })
            .then(function (response) {
                // handle success
                setListProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    return (
        <Box margin={3}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="column" gap={3} alignItems="center" width="50%">
                    <TextField
                        id="outlined-search"
                        label="Tên sản phẩm"
                        type="search"
                        sx={{ width: '100%' }}
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        onKeyDown={handlePress}
                    ></TextField>
                    <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />
                    <Button variant="contained" href="#contained-buttons" onClick={handleSearchProduct}>
                        Tìm
                    </Button>
                </Stack>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 5,
                }}
            >
                <Link to="/product/new">
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ marginBottom: 4 }}>
                        Thêm sản phẩm mới
                    </Button>
                </Link>

                <ProductTable rows={listProduct} />
            </Paper>
        </Box>
    );
}

export default ListProduct;

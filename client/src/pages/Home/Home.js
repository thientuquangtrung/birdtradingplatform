import { Button } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(function () {
        axiosClient
            .get('/product')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                handleError(error);
            });
    }, []);

    return (
        <div className="App">
            <Container>
                <Grid container spacing={1.5}>
                    {products.length > 0 &&
                        products.map(function (product) {
                            return <ProductCard key={product.id} data={product} />;
                        })}
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '16px',
                    }}
                >
                    <Button variant="outlined">Xem Thêm</Button>
                </Box>
            </Container>
        </div>
    );
}

export default Home;

import { Button, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        setLoading(true);
        axiosClient
            .get('/product/search', {
                params: {
                    categoryId: '0',
                    q: '',
                    sortBy: '',
                    order: 'asc',
                    page: 1,
                },
            })
            .then((response) => {
                const list = response.data.data.flatMap((document) => document.value);
                setProducts(list);
                setLoading(false);
            })
            .catch((error) => {
                handleError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <Container>
                <Grid container spacing={1.5}>
                    {loading ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        products.length > 0 &&
                        products.map(function (product) {
                            return (
                                <Grid item xs={3}>
                                    <ProductCard key={product.id} data={product} />
                                </Grid>
                            );
                        })
                    )}
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '16px',
                    }}
                >
                    <Link to={'/shopping'}>
                        <Button
                            variant="outlined"
                            sx={{
                                marginTop: 1,
                                color: '#43a99c',
                                borderColor: '#43a99c',
                                '&:hover': {
                                    borderColor: '#43a99c',
                                },
                            }}
                        >
                            Xem Thêm
                        </Button>
                    </Link>
                </Box>
            </Container>
        </div>
    );
}

export default Home;

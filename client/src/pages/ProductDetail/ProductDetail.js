import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button as JoyButton } from '@mui/joy';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';
import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import CartContext from '../../contexts/CartContext';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import { Grid, Avatar, ImageList, ImageListItem, ButtonGroup } from '@mui/material';
import dayjs from 'dayjs';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import ChatButtonShop from '../../components/ChatButtonShop';

function ProductDetail() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { setCartList, setCartLength } = useContext(CartContext);
    const location = useLocation();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [feedbackList, setFeedbackList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        axiosClient
            .get(`product/${location.state?.id}`)
            .then(function (response) {
                // handle success
                setProduct(response.data);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, [location.state]);

    useEffect(() => {
        axiosClient
            .get(`feedback/${location.state?.id}`, {
                params: {
                    page: currentPage,
                },
            })
            .then(function (response) {
                setFeedbackList(response.data.data);
                setCurrentPage(response.data.meta.currentPage);
                setTotalPage(response.data.meta.totalPages);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, [currentPage]);

    function handleAddToCart() {
        // check if user already logged in

        if (!currentUser) {
            return navigate(`/login?redirectTo=${location.pathname}`);
        }

        axiosClient
            .post('cart', {
                userId: currentUser?.id,
                product,
                quantity,
            })
            .then(function (response) {
                // handle success
                setCartLength(response.data.data.length);
                setCartList(response.data.data.items);
                enqueueSnackbar('Sản phẩm được thêm vào giỏ hàng thành công!', { variant: 'success' });
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }

    return (
        <div>
            <Paper>
                <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Stack direction="column" gap={4} padding={3} justifyContent="flex-start">
                        <img
                            style={{
                                width: '500px',
                                height: '600px',
                                objectFit: 'contain',
                                objectPosition: 'top center',
                            }}
                            src={product.image}
                            alt="Bird"
                        />
                    </Stack>
                    <Box sx={{ padding: 4, width: '70%' }}>
                        <Stack direction="column" gap={3}>
                            <Stack direction="column" gap={1}>
                                <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                                    {product.name}
                                </Typography>

                                <Paper
                                    elevation={0}
                                    sx={{ padding: '7px', backgroundColor: '#f4f4f4', width: '80%', borderRadius: 3 }}
                                >
                                    <Stack direction="row" gap={3} alignItems="center">
                                        <Typography variant="body2" gutterBottom marginLeft={1}>
                                            Được bán bởi
                                        </Typography>
                                        <Stack direction="row" gap={2} alignItems="center">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={product.shop?.image}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                            <Stack direction="column">
                                                <Typography variant="subtitle2" gutterBottom fontSize={16}>
                                                    {/* {product.shop?.name} */}
                                                    Wang ZiQi
                                                </Typography>
                                                <Stack direction="row" gap={1}>
                                                    <ChatButtonShop />
                                                    <JoyButton
                                                        sx={{ padding: '0px 6px' }}
                                                        color="neutral"
                                                        size="sm"
                                                        variant="outlined"
                                                        component={Link}
                                                        state={{
                                                            shopId: product.shopId,
                                                        }}
                                                        to={`/shop/${product.shop?.name}`}
                                                        startDecorator={<StorefrontIcon fontSize="small" />}
                                                    >
                                                        Xem Shop
                                                    </JoyButton>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Stack>
                            <Typography variant="h4" gutterBottom color="#c80606">
                                {product.price ? product.price.toLocaleString('vi-VN') : ''}₫
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 16 }}>
                                {product.description}
                            </Typography>

                            <TextField
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                defaultValue="1"
                                type="number"
                                inputProps={{ min: '0', max: '10', step: '1' }}
                                sx={{ width: '20%' }}
                            />

                            <Box>
                                <Button
                                    onClick={handleAddToCart}
                                    variant="contained"
                                    startIcon={<AddShoppingCartIcon />}
                                    sx={{ color: '#fff', backgroundColor: '#1976d2' }}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Paper>

            <Paper elevation={1} sx={{ paddingTop: 6, paddingLeft: 6, paddingRight: 6, paddingBottom: 0 }}>
                <Typography sx={{ paddingBottom: 2, fontWeight: 500 }} variant="h5" gutterBottom>
                    ĐÁNH GIÁ SẢN PHẨM
                </Typography>
                {feedbackList.length > 0 &&
                    feedbackList.map((feedback) => {
                        return (
                            <Grid key={feedback.orderHeaderId} container sx={{ margin: 3, justifyContent: 'center' }}>
                                <Grid
                                    key={feedback.orderHeaderId}
                                    container
                                    sx={{
                                        paddingBottom: 3,
                                        justifyContent: 'center',
                                        backgroundColor: '#fafafa',
                                        borderBottom: '1px solid #e0e0e0',
                                        borderRadius: '10px',
                                        padding: '20px',
                                    }}
                                >
                                    <Grid item xs={1} paddingRight="10px">
                                        <Avatar
                                            alt="Remy Sharp"
                                            sx={{ width: 56, height: 56 }}
                                            src={feedback.customer.image}
                                        />
                                    </Grid>
                                    <Grid item xs={11} sx={{ paddingBottom: 2 }}>
                                        <Stack>
                                            <Typography variant="h6" display="block">
                                                {feedback.customer.name}
                                            </Typography>
                                            <Typography
                                                fontSize={'25px'}
                                                fontStyle={'italic'}
                                                variant="caption"
                                                display="block"
                                                gutterBottom
                                                sx={{ color: 'grey', fontSize: '10px' }}
                                            >
                                                {dayjs(feedback.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
                                                    'DD/MM/YYYY H:mm A',
                                                )}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                gutterBottom
                                                sx={{ paddingTop: 1.5, wordWrap: 'break-word', paddingBottom: 1 }}
                                            >
                                                {feedback.content}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    width: '150px',
                                                    height: '150px',
                                                    // border: '1px solid #eeeeee',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        objectFit: 'cover ',
                                                        width: '149px',
                                                        height: '149px',
                                                        borderRadius: '3px',
                                                    }}
                                                    src={feedback.image}
                                                    alt={''}
                                                />
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                <Grid container sx={{ paddingTop: 2.5, justifyContent: 'flex-end', paddingRight: 2 }}>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                        size="small"
                        sx={{ marginBottom: '15px' }}
                    >
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => {
                                setCurrentPage((prev) => prev - 1);
                            }}
                        >
                            <ChevronLeftSharpIcon />
                        </Button>
                        <Button
                            disabled={currentPage === totalPage}
                            onClick={() => {
                                setCurrentPage((prev) => prev + 1);
                            }}
                        >
                            <ChevronRightSharpIcon />
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Paper>
        </div>
    );
}

export default ProductDetail;

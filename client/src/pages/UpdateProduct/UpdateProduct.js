import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UploadImage from '../../components/UploadImage';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Stack } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleError from '../../utils/handleError';
import axiosClient from '../../api/axiosClient';
import CategoryList from '../../components/CategoryList';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {
        axiosClient
            .get(`product/${id}`)
            .then((response) => {
                const product = response.data;
                setCategoryId(product.categoryId);
                setName(product.name);
                setPrice(product.price);
                setDescription(product.description);
                setImg(product.image);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, []);

    const navigate = useNavigate();

    const isFullfilled = () => {
        return !(name && price && description && categoryId && img);
    };

    function handleSubmit() {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', img);

        axiosClient
            .patch('seller/product', formData)
            .then(function (response) {
                // handle success

                enqueueSnackbar('Sản phẩm được cập nhật thành công!', { variant: 'success' });
                navigate('/product/list/all');
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }

    return (
        <Box padding={3}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="column" gap={3} alignItems="center" width="500px">
                    <Typography variant="h4" gutterBottom>
                        Cập nhật sản phẩm
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Hình ảnh sản phẩm:
                        </Typography>
                        <UploadImage uploadFile={img} setUploadFile={setImg} />
                    </Box>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Tên sản phẩm"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />
                    <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Giá sản phẩm</InputLabel>
                        <OutlinedInput
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Giá sản phẩm"
                            type="number"
                        />
                    </FormControl>

                    <TextareaAutosize
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-label="minimum height"
                        placeholder=" Mô tả"
                        minRows={3}
                        style={{ width: '100%', fontSize: 16, padding: 3, fontFamily: 'Roboto' }}
                    />

                    <Button disabled={isFullfilled()} variant="contained" color="success" onClick={handleSubmit}>
                        Lưu & Hiển thị
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}

export default UpdateProduct;

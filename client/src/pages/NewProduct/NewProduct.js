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
import { useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axiosClient from '../../api/axiosClient';

function NewProduct() {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');

    const imageRef = useRef();

    function handleSubmit() {
        const image = imageRef.current.files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        axiosClient
            .post('seller/product', formData)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
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
                        Thông tin cơ bản
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Hình ảnh sản phẩm:
                        </Typography>
                        <UploadImage ref={imageRef} />
                    </Box>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Tên sản phẩm"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    />

                    <TextField
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        id="outlined-select-currency"
                        select
                        label="Ngành hàng"
                        defaultValue="EUR"
                        sx={{ width: '100%' }}
                    >
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                    </TextField>

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
                        style={{ width: '100%', fontSize: 16, padding: 3 }}
                    />

                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Lưu & Hiển thị
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}

export default NewProduct;

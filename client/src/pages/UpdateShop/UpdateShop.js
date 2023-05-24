import { Paper, Typography, Button, TextField, Stack, Box, TextareaAutosize } from '@mui/material';
import UploadImage from '../../components/UploadImage';
import axiosClient from '../../api/axiosClient';
import { useRef, useState } from 'react';

export default function UpdateShop() {
    // function UpdateShop() {
    const [name, setName] = useState('');
    const [pickUpAddress, setpickUpAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const profileRef = useRef();

    function handleSubmit() {
        const profile = profileRef.current.files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('pickUpAddress', pickUpAddress);
        formData.append('phone', phone);
        formData.append('description', description);
        formData.append('profile', profile);

        // //tam thoi
        // formData.append('shopId', 'FE1A6EEC-B6E6-4E7E-8D64-28B77ED30C71');

        axiosClient
            .patch('/auth/seller/me', formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // }

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 3,
            }}
        >
            <Box marginBottom={2} marginRight={2} marginTop={2}>
                <Typography marginLeft={2} variant="h4" gutterBottom>
                    Hồ Sơ Shop
                </Typography>
            </Box>
            <Stack direction="column" gap={3} width="500px">
                <UploadImage rounded title="Select a logo" ref={profileRef} />
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-search"
                    label="Tên Shop"
                    type="search"
                    variant="outlined"
                />
                <TextField
                    value={pickUpAddress}
                    onChange={(e) => setpickUpAddress(e.target.value)}
                    id="outlined-search"
                    label="Địa chỉ"
                    type="search"
                    variant="outlined"
                />
                <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="outlined-search"
                    label="Số điện thoại"
                    type="search"
                    variant="outlined"
                />
                <TextField id="outlined-search" type="search" variant="outlined" value="trung@gmail.com" disabled />
                <TextareaAutosize
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={5}
                    placeholder="nhập thông tin mô tả shop"
                />
            </Stack>
            <Box mt={3}>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

import React, { useState, useRef, useContext } from 'react';
import { Paper, Typography, Button, TextField, Stack, Box, TextareaAutosize } from '@mui/material';
import UploadImage from '../../components/UploadImage';
import axiosClient from '../../api/axiosClient';

import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import handleError from '../../utils/handleError';

export default function UpdateShop() {
    const { currentUser } = useContext(AuthContext);

    // function UpdateShop() {
    const phoneformat = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const [name, setName] = useState(currentUser.name);
    const [pickUpAddress, setPickUpAddress] = useState(currentUser.pickUpAddress);
    const [phone, setPhone] = useState(currentUser.phone);
    const [description, setDescription] = useState(currentUser.description);
    const [validationMsg, setValidationMsg] = useState('');
    const profileRef = useRef();
    const [message, setMessage] = useState('');
    const isChange = () => {
        return !(
            currentUser.name !== name ||
            currentUser.pickUpAddress !== pickUpAddress ||
            currentUser.description !== description ||
            currentUser.phone !== phone ||
            profileRef.current?.files[0]
        );
    };
    function isEmpty(str) {
        return !str || str.length === 0;
    }
    const validateAll = () => {
        const msg = {};
        if (isEmpty(name) || isEmpty(pickUpAddress) || isEmpty(phone)) {
            msg.name = 'Vui lòng nhập đầy đủ thông tin !';
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const validateElement = () => {
        const message = {};
        if (!phoneformat.test(phone)) {
            message.phone = 'Nhập sai định dạng số điện thoại';
        }
        setMessage(message);
        if (Object.keys(message).length > 0) return false;
        return true;
    };

    function handleSubmit() {
        const profile = profileRef.current.files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('pickUpAddress', pickUpAddress);
        formData.append('phone', phone);
        formData.append('description', description);
        formData.append('profile', profile);
        const isValid = validateAll();
        const isValidElement = validateElement();
        if (isValid && isValidElement) {
            axiosClient
                .patch('/auth/seller/me', formData)
                .then((response) => {
                    enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                })
                .catch((error) => {
                    handleError(error);
                });
        }
    }

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
                <UploadImage rounded title="Select a logo" ref={profileRef} img={currentUser.image} />
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-search"
                    label="Tên Shop"
                    type="search"
                    variant="outlined"
                    required
                />
                <TextField
                    value={pickUpAddress}
                    onChange={(e) => setPickUpAddress(e.target.value)}
                    id="outlined-search"
                    label="Địa chỉ"
                    type="search"
                    variant="outlined"
                    required
                />
                <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="outlined-search"
                    label="Số điện thoại"
                    variant="outlined"
                    margin="0"
                    required
                />
                {message.phone && (
                    <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px' }}>
                        {message.phone}
                    </Typography>
                )}
                <TextField id="outlined-search" type="search" variant="outlined" value={currentUser.email} disabled />
                <TextareaAutosize
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={5}
                    placeholder="Mô tả shop"
                    style={{ fontFamily: 'roboto', fontSize: '15px' }}
                />
            </Stack>
            <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px', marginTop: '5px' }}>
                {validationMsg.name}
            </Typography>
            <Box>
                <Button disabled={isChange()} onClick={handleSubmit} color="primary" variant="contained">
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

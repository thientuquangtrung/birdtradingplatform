import React, { useState, useRef, useContext } from 'react';
import { Paper, Typography, Button, TextField, Stack, Box, TextareaAutosize } from '@mui/material';
import UploadImage from '../../components/UploadImage';
import axiosClient from '../../api/axiosClient';

import AuthContext from '../../contexts/AuthContext';
import { enqueueSnackbar } from 'notistack';
import handleError from '../../utils/handleError';

export default function UpdateCustomer1() {
    const { currentUser } = useContext(AuthContext);

    // function UpdateShop() {
    const phoneformat = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const [name, setName] = useState();
    const [pickUpAddress, setPickUpAddress] = useState();
    const [phone, setPhone] = useState();
    const [validationMsg, setValidationMsg] = useState('');
    const profileRef = useRef();
    const [message, setMessage] = useState('');

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
        formData.append('profile', profile);
        const isValid = validateAll();
        const isValidElement = validateElement();
        //     if (isValid && isValidElement) {
        //         axiosClient
        //             .patch('/auth/seller/me', formData)
        //             .then((response) => {
        //                 enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
        //             })
        //             .catch((error) => {
        //                 handleError(error);
        //             });
        //     }
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
                    Hồ Sơ Của Tôi
                </Typography>
                <Typography>Quản lý thông tin hồ sơ để bảo mật tài khoản</Typography>
            </Box>
            <Stack direction="column" gap={3} width="50%">
                <UploadImage rounded title="Select Avatar" />
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-search"
                    label="Tên Đăng Nhập"
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
                <TextField id="outlined-search" type="search" variant="outlined" disabled />
            </Stack>
            <Typography style={{ color: 'red', fontSize: '13px', marginLeft: '10px', marginTop: '5px' }}>
                {validationMsg.name}
            </Typography>
            <Box>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

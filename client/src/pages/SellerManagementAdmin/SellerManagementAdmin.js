import { Grid, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import UploadImage from '../../components/UploadImage';
import Input from '@mui/joy/Input';
import { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

function SellerManagementAdmin() {
    const navigate = useNavigate();
    const [upLoadFile, setUpLoadFile] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [error, setError] = useState('');
    const phoneformat = /(0[3|5|7|8|9])([0-9]{8})\b/;
    const validate = () => {
        let isValid = true;
        let errorMessage = '';
        let errorMsg = '';

        if (upLoadFile === '' || name === '' || email === '' || phone === '' || address === '' || password === '') {
            isValid = false;
            errorMessage = 'Vui lòng điền đầy đủ thông tin';
        }
        if (!phoneformat.test(phone)) {
            isValid = false;
            errorMsg = 'Số điện thoại không hợp lệ';
        }

        setErrorMsg(errorMessage);
        setError(errorMsg);
        return isValid;
    };
    function handleCreate() {
        if (validate()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', password);
            formData.append('address', address);
            formData.append('profile', upLoadFile);
            formData.append('role', 'SELLER');

            axiosClient
                .post(`auth/account`, formData)
                .then(function (response) {
                    // handle success
                    enqueueSnackbar('Created successfully', { variant: 'success' });
                    navigate('/seller_management');
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    }
    return (
        <Box marginTop={5} marginBottom={5} marginLeft={10} marginRight={10}>
            <Typography variant="h4" fontWeight={600} fontSize={'x-large'} paddingTop={3} paddingBottom={3}>
                Create a new seller
            </Typography>
            <Box marginTop={5}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Paper
                            sx={{
                                padding: 8.3,
                                borderRadius: '16px',
                                backgroundColor: 'rgb(255, 255, 255)',
                                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                boxShadow:
                                    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                            }}
                        >
                            <UploadImage
                                rounded
                                vertical
                                title="Chọn ảnh"
                                uploadFile={upLoadFile}
                                setUploadFile={setUpLoadFile}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper
                            sx={{
                                padding: 3,
                                borderRadius: '16px',
                                backgroundColor: 'rgb(255, 255, 255)',
                                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                boxShadow:
                                    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                            }}
                        >
                            <Grid container rowSpacing={3} columnSpacing={2} sx={{ paddingBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={false}
                                        placeholder="Họ Tên"
                                        variant="outlined"
                                        error={!!errorMsg && name === ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={false}
                                        placeholder="Email"
                                        variant="outlined"
                                        type="email"
                                        error={!!errorMsg && email === ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={false}
                                        placeholder="Số điện thoại"
                                        variant="outlined"
                                        type="tel"
                                        error={!!error}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={false}
                                        placeholder="Mật khẩu"
                                        variant="outlined"
                                        type="password"
                                        error={!!errorMsg && password === ''}
                                    />
                                </Grid>
                                <Typography style={{ color: 'red', fontSize: '13px', margin: '10px 0 0 15px' }}>
                                    {error}
                                </Typography>
                                <Grid item xs={12}>
                                    <Input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled={false}
                                        placeholder="Địa chỉ"
                                        variant="outlined"
                                        error={!!errorMsg && address === ''}
                                    />
                                </Grid>
                                <Typography margin="10px 0 0 15px" color="error" fontSize="13px">
                                    {errorMsg}
                                </Typography>
                            </Grid>
                            <Box display={'flex'} justifyContent={'flex-end'} marginTop={1.5}>
                                <Button color="neutral" onClick={handleCreate}>
                                    Tạo Seller Mới
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default SellerManagementAdmin;

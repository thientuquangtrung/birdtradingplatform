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

    function handleCreate() {
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
                                        color="neutral"
                                        disabled={false}
                                        placeholder="Họ Tên"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        color="neutral"
                                        disabled={false}
                                        placeholder="Email"
                                        variant="outlined"
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        color="neutral"
                                        disabled={false}
                                        placeholder="Số điện thoại"
                                        variant="outlined"
                                        type="tel"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        color="neutral"
                                        disabled={false}
                                        placeholder="Mật khẩu"
                                        variant="outlined"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        color="neutral"
                                        disabled={false}
                                        placeholder="Địa chỉ"
                                        variant="outlined"
                                    />
                                </Grid>
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

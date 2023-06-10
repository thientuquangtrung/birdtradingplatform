import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import UploadImage from '../../components/UploadImage';

function SellerManagementAdmin() {
    const [upLoadFile, setUpLoadFile] = useState('');
    return (
        <Box>
            <Typography variant="h4" fontWeight={600} fontSize={'x-large'} paddingTop={3} paddingBottom={3}>
                Create a new seller
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                            <UploadImage rounded title="Chọn ảnh" uploadFile={upLoadFile} setUploadFile={setUpLoadFile} />
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
                            <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
                                <Grid item xs={6}>
                                    <TextField required id="outlined-required" label="Họ Tên" sx={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required id="outlined-required" label="Email" sx={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Số Điện Thoại"
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Mật Khẩu"
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required id="outlined-required" label="Địa Chỉ" sx={{ width: '100%' }} />
                                </Grid>
                            </Grid>
                            <Box display={'flex'} justifyContent={'flex-end'}>
                                <Button
                                    sx={{
                                        boxShadow:'none',
                                        borderRadius: '8px',
                                        transition:
                                            'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                    }}
                                    variant="contained"
                                >
                                    Tạo seller mới
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

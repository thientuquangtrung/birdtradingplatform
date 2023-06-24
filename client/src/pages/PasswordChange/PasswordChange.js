import React from 'react';
import SubCustomerLayout from '../../layouts/SubCustomerLayout/SubCustomerLayout';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const PasswordChange = () => {
    return (
        <SubCustomerLayout>
            <Paper sx={{ height: '680px', width: '100%' }}>
                <Stack borderBottom="1px solid " marginBottom="30px" sx={{ margin: '30px' }}>
                    <Typography variant="h4" fontWeight="400">
                        Đổi mật khẩu
                    </Typography>
                    <Typography variant="h6" fontWeight="350">
                        {' '}
                        Để bảo mật tài khoản vui lòng không chia sẻ cho người khác
                    </Typography>
                </Stack>
                <Stack sx={{ margin: '100px 30px 30px 30px', alignItems: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6" width="210px" fontWeight="400">
                            Mật khẩu mới :
                        </Typography>
                        <TextField size="small" type="password"></TextField>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" width="210px" fontWeight="400">
                            Xác nhận mật khẩu :
                        </Typography>
                        <TextField size="small" type="password"></TextField>
                    </div>
                </Stack>
                <Grid align="center">
                    <Button sx={{ width: '110px', height: '36px' }} variant="contained">
                        Xác nhận
                    </Button>
                </Grid>
            </Paper>
        </SubCustomerLayout>
    );
};
export default PasswordChange;

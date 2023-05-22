import { Paper, Typography, Button, TextField, Stack, Box, TextareaAutosize } from '@mui/material';
import UploadImage from '../../components/UploadImage';

export default function UpdateShop() {
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
            <Stack direction='column' gap={3} width='500px' >
                <UploadImage rounded title='Select a logo' />
                <TextField id="outlined-search" label="Tên Shop" type="search" variant="outlined" />
                <TextField id="outlined-search" label="Địa chỉ" type="search" variant="outlined" />
                <TextField id="outlined-search" label="Số điện thoại" type="search" variant="outlined" />
                <TextField id="outlined-search" type="search" variant="outlined" value='trung@gmail.com' disabled />
                <TextareaAutosize minRows={5} placeholder='nhập thông tin mô tả shop' />
            </Stack>
            <Box mt={3}>
                <Button color="primary" variant="contained">
                    Lưu
                </Button>
            </Box>
        </Paper>
    );
}

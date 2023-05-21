import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UploadImage from '../../components/UploadImage';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Stack, styled } from '@mui/system';

function NewProduct() {
    return (
        <Box padding={3} >
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="column" gap={3} alignItems="center" width='500px'>
                    <Typography variant="h4" gutterBottom>
                        Thông tin cơ bản
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom marginRight={3}>
                            Hình ảnh sản phẩm:
                        </Typography>
                        <UploadImage />
                    </Box>
                    <TextField id="outlined-basic" label="Tên sản phẩm" variant="outlined" sx={{ width: '100%'}}/>

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Ngành hàng"
                        defaultValue="EUR"
                        sx={{ width: '100%' }}
                    ></TextField>

                    <TextareaAutosize
                        aria-label="minimum height"
                        placeholder=" Mô tả"
                        minRows={3}
                        style={{ width: '100%', fontSize: 16, padding: 3 }}
                    />

                    <Button variant="contained" color="success" marginRight={0}>
                        Lưu & Hiển thị
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}

export default NewProduct;

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function NewProduct() {
    return (
        <Box padding={3} textAlign={'center'}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin cơ bản
                </Typography>
                <Box sx={{ width: 500, marginLeft: 20, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Hình ảnh sản phẩm:
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        sx={{
                            margin: 3,
                        }}
                    >
                        {' '}
                        Upload a file
                        <input type="file" hidden />
                    </Button>
                </Box>
                <TextField id="outlined-basic" label="Tên sản phẩm" variant="outlined" sx={{ width: 500 }} /> <br />{' '}
                <br />
                <TextField id="outlined-basic" label="Ngành hàng" variant="outlined" sx={{ width: 500 }} /> <br />{' '}
                <br />
                <TextField id="outlined-basic" label="Mô tả sản phẩm" variant="outlined" sx={{ width: 500 }} />
                <br /> <br />
                <Button variant="contained" color="success" marginRight={0}>
                    Lưu & Hiển thị
                </Button>
            </Paper>
        </Box>
    );
}

export default NewProduct;

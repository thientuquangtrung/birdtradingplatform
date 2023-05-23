import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function ProductDetail() {
    return (
        <Paper sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ padding: 3 }}>
                <img
                    style={{ width: '100%', height: '90%', objectFit: 'contain' }}
                    src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/11/19/endangered-photo-portraits-birds-tim-flach-1-2-5fae3a55193f2700-16057635499831247085390.jpg"
                    alt="Bird"
                />
            </Box>
            <Box sx={{ padding: 4, width: '70%' }}>
                <Stack direction="column" gap={6}>
                    <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Typography>
                    <Typography variant="h4" gutterBottom color="#c80606">
                        <AttachMoneyIcon fontSize="large" /> 140.000
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 16 }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur.Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur.Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    </Typography>

                    <TextField
                        defaultValue="1"
                        type="number"
                        inputProps={{ min: '0', max: '10', step: '1' }}
                        sx={{ width: '20%' }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        sx={{ width: '40%', color: '#fff', backgroundColor: '#1976d2' }}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
}

export default ProductDetail;

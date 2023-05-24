import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ProductTable from '../../components/ProductTable';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';

function ListProduct() {
    return (
        <Box margin={3}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="column" gap={3} alignItems="center" width="500px">
                    <TextField
                        id="outlined-search"
                        label="Tên sản phẩm"
                        type="search"
                        sx={{ width: '100%' }}
                    ></TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Ngành hàng"
                        defaultValue="EUR"
                        sx={{ width: '100%' }}
                    ></TextField>
                    <Button variant="contained" href="#contained-buttons">
                        Tìm
                    </Button>
                </Stack>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 5,
                }}
            >
                <Link to="/product/new">
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ marginBottom: 4 }}>
                        Thêm sản phẩm mới
                    </Button>
                </Link>

                <ProductTable />
            </Paper>
        </Box>
    );
}

export default ListProduct;

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ProductTable from '../../components/ProductTable/ProductTable';

function ListProduct() {
    return (
        <Box margin={3}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    textAlign: 'center',
                }}
            >
                <TextField id="outlined-search" label="Tên sản phẩm" type="search" sx={{ width: 400 }}></TextField>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Ngành hàng"
                    defaultValue="EUR"
                    sx={{ width: 400, marginTop: 5 }}
                ></TextField>{' '}
                <br />
                <br />
                <Button variant="contained" href="#contained-buttons">
                    Tìm
                </Button>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 5,
                }}
            >
                <Button variant="contained" startIcon={<AddIcon />} sx={{ marginBottom: 4 }}>
                    Thêm sản phẩm mới
                </Button>

                <ProductTable />
            </Paper>
        </Box>
    );
}

export default ListProduct;

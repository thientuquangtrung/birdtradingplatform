import { Paper, Stack, Typography } from '@mui/material';
import { Button, Input } from '@mui/joy';
import { Add, Search } from '@mui/icons-material';
import SellerTable from '../../components/SellerTable';
import { Link } from 'react-router-dom';

function SellerManagement() {
    return (
        <Stack direction="column" padding={5} gap={5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h2">
                    Sellers
                </Typography>
                <Button
                    variant="soft"
                    color="primary"
                    startDecorator={<Add />}
                    component={Link}
                    to="http://admin.localhost:3000/seller_management/add_seller"
                >
                    Add
                </Button>
            </Stack>
            <Paper elevation={2} sx={{ height: '80px', padding: 2 }}>
                <Input
                    startDecorator={<Search />}
                    sx={{ width: '50%', height: '100%' }}
                    placeholder="Search for account..."
                />
            </Paper>
            <Paper elevation={2} sx={{ height: '500px', padding: 2 }}>
                <SellerTable />
            </Paper>
        </Stack>
    );
}

export default SellerManagement;

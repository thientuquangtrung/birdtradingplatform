import { Paper, Stack, Typography } from '@mui/material';
import { Button, Input } from '@mui/joy';
import { Add, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import CustomerTable from '../../components/CustomerTable';

function CustomerManagement() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosClient
            .get(`auth/account`, {
                params: {
                    role: 'CUSTOMER',
                },
            })
            .then(function (response) {
                // handle success
                setData(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    return (
        <Stack direction="column" padding={5} gap={5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h2">
                    Customers
                </Typography>
                <Button
                    variant="soft"
                    color="primary"
                    startDecorator={<Add />}
                    component={Link}
                    to="/customer_management/add_customer"
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
                <CustomerTable data={data} />
            </Paper>
        </Stack>
    );
}

export default CustomerManagement;

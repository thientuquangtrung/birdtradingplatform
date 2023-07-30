import { Paper, Stack, Typography } from '@mui/material';
import { Button, Input } from '@mui/joy';
import { Add, Search } from '@mui/icons-material';
import SellerTable from '../../components/SellerTable';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import handleError from '../../utils/handleError';

function SellerManagement() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');

    const styles = {
        button: {
            backgroundColor: '#43a99c47',
            '&:hover': {
                backgroundColor: '#43a99c73',
            },
        },
    };

    useEffect(() => {
        axiosClient
            .get(`auth/account`, {
                params: {
                    role: 'SELLER',
                    name,
                },
            })
            .then(function (response) {
                // handle success
                setData(response.data.data);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    }, [name]);

    return (
        <Stack direction="column" padding={5} gap={5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h2">
                    Sellers
                </Typography>
                <Button
                    variant="soft"
                    color="success"
                    startDecorator={<Add />}
                    component={Link}
                    to="/seller_management/add_seller"
                    sx={styles.button}
                >
                    Add
                </Button>
            </Stack>
            <Paper elevation={2} sx={{ height: '80px', padding: 2 }}>
                <Input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    startDecorator={<Search />}
                    sx={{ width: '50%', height: '100%' }}
                    placeholder="Search for account..."
                />
            </Paper>
            <Paper elevation={2} sx={{ height: '500px', padding: 2 }}>
                <SellerTable data={data} />
            </Paper>
        </Stack>
    );
}

export default SellerManagement;

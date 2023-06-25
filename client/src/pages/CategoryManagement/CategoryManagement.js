import { AspectRatio, Card, IconButton, Typography } from '@mui/joy';
import { CardContent, Grid } from '@mui/material';
import InteractiveCard from '../../components/InteractiveCard';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import CreateCategory from '../../components/CreateCategory';
import { Stack } from '@mui/system';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/joy/Button';

function CategoryManagement() {
    const [getCategories, setGetCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(function () {
        axiosClient
            .get('category')
            .then((response) => {
                // console.log(response);
                setGetCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosClient
            .post('category', {
                params: {
                    role: 'ADMIN',
                    categoryId,
                },
            })
            .then((response) => {
                console.log(response);
                // setGetCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Grid container spacing={5} sx={{ flexGrow: 1 }}>
            {getCategories.length > 0 &&
                getCategories.map((category) => (
                    <Grid item xs={4} key={category.id}>
                        <InteractiveCard data={category} />
                    </Grid>
                ))}

            <Grid item xs={4}>
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', padding: 0 },
                        padding: 0,
                    }}
                >
                    {/* <Stack direction="row" gap={2} alignItems="center" sx={{ margin: '15px 0px 15px 15px ' }}> */}
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <CategoryTwoToneIcon color="info" />
                    </AspectRatio>
                    <Stack direction="column" alignItems="center" gap={2} sx={{ flex: 1 }}>
                        <Stack direction="row" gap={1}>
                            <Input color="neutral" placeholder="Nhap Category" />

                            <IconButton color="success" variant="outlined">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        </Stack>

                        <Button fullWidth variant="soft" color="neutral">
                            Close
                        </Button>
                    </Stack>

                    {/* <CreateCategory /> */}
                    {/* </Stack> */}
                </Card>
            </Grid>
        </Grid>
    );
}

export default CategoryManagement;

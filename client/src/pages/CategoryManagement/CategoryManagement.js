import { AspectRatio, Card, IconButton } from '@mui/joy';
import { CardContent, Grid } from '@mui/material';
import InteractiveCard from '../../components/InteractiveCard';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Stack } from '@mui/system';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/joy/Button';
import Paper from '@mui/material/Paper';

function CategoryManagement() {
    const [getCategories, setGetCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [isBoxVisible, setIsBoxVisible] = useState(false);

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
        <Grid container spacing={3} sx={{ flexGrow: 1}} margin='auto'>
            <Stack direction='row' width='90%' gap={2}>
                {getCategories.length > 0 &&
                    getCategories.map((category) => (
                        <Grid item xs={3} key={category.id}>
                            <InteractiveCard data={category} />
                        </Grid>
                    ))}
                {!isBoxVisible && (
                    <Grid item xs={3}>
                        <Card
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <AspectRatio ratio="1" sx={{ width: 90, cursor: 'pointer' }}>
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/016/860/540/large_2x/add-button-plus-icon-in-flat-style-vector.jpg"
                                        loading="lazy"
                                        alt=""
                                        onClick={() => setIsBoxVisible(true)}
                                    />
                                </AspectRatio>
                                <CardContent sx={{ padding: 0 }}>
                                    <Button
                                        sx={{
                                            flexWrap: 'wrap',
                                            alignContents: 'center',
                                            padding: 2,
                                            top: 11,
                                        }}
                                        variant="soft"
                                        color="neutral"
                                        size="lg"
                                        onClick={() => setIsBoxVisible(true)}
                                    >
                                        Add Category
                                    </Button>
                                </CardContent>
                            </Stack>
                        </Card>
                    </Grid>
                )}
    
                {isBoxVisible && (
                    <Grid item xs={3} width='100%'>
                        <Card
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }, padding: '17px 10px', width: '90%'
                            }}
                        >
                            <Stack direction="column" gap={2} width='100%' >
                                <Stack direction="row" gap={1}>
                                    <Input color="neutral" placeholder="Nhap Category" size="md"/>
                                    {/* <IconButton color="success" variant="plain" size="sm">
                                            <CheckIcon fontSize="small" />
                                        </IconButton> */}
                                    <img
                                        width="40px"
                                        height="40px"
                                        src="https://static.vecteezy.com/system/resources/previews/000/266/061/large_2x/check-mark-in-circle-brush-draw-style-illustration-vector.jpg"
                                    />
                                </Stack>
    
                                <Button fullWidth variant="soft" color="neutral" size="sm">
                                    Close
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                )}
            </Stack>
        </Grid>
    );
}

export default CategoryManagement;

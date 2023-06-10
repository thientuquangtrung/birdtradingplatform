import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Box, Grid, ListItemButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../api/axiosClient';


function ShopProduct() {
    const location = useLocation();
    const [categoryList, setCategoryList] = useState([]);

    useEffect(function () {
        axiosClient
            .get('/category')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    

    return (
        
            <Grid item xs={2} marginTop={0.4}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div" sx={{ padding: 0.5 }}>
                                Danh mục
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                    {categoryList.length > 0 &&
                        categoryList.map((category) => {
                            return (
                                <Link
                                    to={`/shopping/${category.name}`}
                                    key={category.id}
                                    state={{
                                        categoryId: category.id,
                                    }}
                                >
                                    <ListItemButton
                                        sx={{ pt: 1, pb: 1 }}
                                        selected={location.state?.categoryId === category.id}
                                        divider
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                </List>

            </Grid>
       
    );
}

export default ShopProduct;

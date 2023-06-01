import { Autocomplete, Box, Button, CircularProgress, Grid, Icon, Paper, Stack, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';
import ProductCard from '../../components/ProductCard';
import Pagination from '@mui/material/Pagination';

function Shopping() {

    const location = useLocation();
    const [listProduct, setListProduct] = useState(location.state.list);
    useEffect(function(){
        setListProduct(location.state.list)
    }, [location.state.list]);

    console.log(listProduct);

    const price = [{ label: 'Giá: Thấp đến Cao' }, { label: 'Giá: Cao đến Thấp' }];

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} marginTop={1.8}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div" sx={{padding: 0.5}}>
                                Danh mục
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-label="mailbox folders"
                >
                    <ListItem button>
                        <ListItemText primary="Loại Chim" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <ListItemText primary="Thức ăn" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Phụ kiện" />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={10}>
                <Paper>
                    {/* <Divider variant="middle" /> */}
                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                            alignItems="center"
                            padding={1}
                            
                        >
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={4}>
                                    <Typography marginRight={1} variant="body1">
                                        Sắp xếp theo
                                    </Typography>

                                    <Button variant="contained">Mới Nhất</Button>

                                    <Button variant="contained">Bán Chạy</Button>

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={price}
                                        sx={{ width: 300 }}
                                        
                                        renderInput={(params) => (
                                            <TextField {...params} label="Giá" />
                                        )}
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
                <Grid sx={{paddingTop: 3}} container spacing={1.5}>
                {listProduct.map(function (product) {
                            return <ProductCard key={product.id} data={product} />;
                        })}
                </Grid>
                <Pagination count={10} color="primary" shape='rounded' style={{ display: 'flex', justifyContent: 'center'}}/>
            </Grid>
        </Grid>
    );
}

export default Shopping;

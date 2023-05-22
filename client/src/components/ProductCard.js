import React, { useState } from 'react';
import { Paper, Grid, Box, Button, CardActions, Typography } from '@mui/material';

const ProductCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Grid item xs={3}>
            <Paper
                elevation={3}
                sx={{
                    transform: isHovered ? 'translateY(-5px)' : 'none',
                    transition: 'transform 0.3s ease',
                    boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        paddingBottom: '100%',
                    }}
                >
                    <img
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: isHovered ? 'scale(1.1)' : 'none',
                            transition: 'transform 0.3s ease',
                        }}
                        src="https://genk.mediacdn.vn/thumb_w/660/139269124445442048/2020/11/19/endangered-photo-portraits-birds-tim-flach-1-2-5fae3a55193f2700-16057635499831247085390.jpg"
                        alt=""
                    />
                </Box>
                <Box sx={{ border: '1px solid #C0C0C0' }} paddingTop={2} paddingBottom={0.5} paddingLeft={2} paddingRight={2}>
                    <Typography paddingBottom={1} variant="h6" component="h2" noWrap>
                        Chim sẻ
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    >
                        <Typography variant="body2" component="p" noWrap>
                            185.000đ
                        </Typography>
                        <Typography variant="body2" component="p" noWrap>
                            Đã bán: 178
                        </Typography>
                    </Box>

                    <CardActions
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}
                    >
                        <Button size="small">Chi tiết</Button>
                    </CardActions>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ProductCard;

import React, { useState } from 'react';
import { Paper, Grid, Box, Button, CardActions, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                marginBottom:3,
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
                    src={data.image}
                    alt=""
                />
            </Box>
            <Box
                sx={{ border: '1px solid #C0C0C0' }}
                paddingTop={2}
                paddingBottom={0.5}
                paddingLeft={2}
                paddingRight={2}
            >
                <Typography paddingBottom={1} variant="h6" component="h2" noWrap>
                    {data.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="body2" component="p" noWrap>
                        {data.price}
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
                        <Link to={`/product/detail/${data.name}`} state={{
                            id: data.id,
                        }}>
                            <Button size="small">Chi tiết</Button>
                        </Link>
                    </CardActions>
                </Box>
            </Paper>
    );
};

export default ProductCard;

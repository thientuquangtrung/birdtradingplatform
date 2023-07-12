import { Avatar, Grid, Icon, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function AdminDashboard() {
    return (
        <Box>
            <Typography variant="h4" fontWeight={600} fontSize={'x-large'} sx={{ p: 3, color: '#035e52' }}>
                Hi, Welcome back
            </Typography>

            <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Link to="http://admin.localhost:3000/customer_management">
                            <Paper
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: '#43a99c36',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    borderRadius: '12px',
                                }}
                            >
                                <Icon
                                    sx={{
                                        justifyContent: 'center',

                                        borderRadius: '50%',
                                        marginBottom: 4,
                                        width: '70px',
                                        height: '70px',
                                        padding: 1.5,
                                        color: '#037869',
                                        backgroundImage:
                                            'linear-gradient(135deg, rgb(98 209 9 / 0%) 0%, rgb(12 183 12 / 36%) 100%)',
                                    }}
                                >
                                    <AccessibilityIcon sx={{ fontSize: 40 }} />
                                </Icon>
                                <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#037869' }}>
                                    100K
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 300, opacity: 0.72, fontSize: '0.875rem', color: '#037869' }}
                                >
                                    Total Customers
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>

                    <Grid item xs={3}>
                        <Link to="http://admin.localhost:3000/seller_management">
                            <Paper
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'rgb(255, 247, 205)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 4,
                                    borderRadius: '12px',
                                }}
                            >
                                <Icon
                                    sx={{
                                        justifyContent: 'center',

                                        borderRadius: '50%',
                                        marginBottom: 4,
                                        width: '70px',
                                        height: '70px',
                                        padding: 1.5,
                                        color: 'rgb(183, 129, 3)',
                                        backgroundImage:
                                            'linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)',
                                    }}
                                >
                                    <StorefrontIcon sx={{ fontSize: 40 }} />
                                </Icon>
                                <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#7A4F01' }}>
                                    100K
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 300, opacity: 0.72, fontSize: '0.875rem', color: '#7A4F01' }}
                                >
                                    Total Sellers
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgb(255, 231, 217)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 4,
                                borderRadius: '12px',
                            }}
                        >
                            <Icon
                                sx={{
                                    justifyContent: 'center',

                                    borderRadius: '50%',
                                    marginBottom: 4,
                                    width: '70px',
                                    height: '70px',
                                    padding: 1.5,
                                    color: 'rgb(183, 33, 54)',
                                    backgroundImage:
                                        'linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)',
                                }}
                            >
                                <ShoppingCartOutlinedIcon sx={{ fontSize: 40 }} />
                            </Icon>
                            <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#7A0C2E' }}>
                                100K
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 300, opacity: 0.72, fontSize: '0.875rem', color: '#7A0C2E' }}
                            >
                                Total Orders
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'rgb(209, 233, 252)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 4,
                                borderRadius: '12px',
                            }}
                        >
                            <Icon
                                sx={{
                                    justifyContent: 'center',

                                    borderRadius: '50%',
                                    marginBottom: 4,
                                    width: '70px',
                                    height: '70px',
                                    padding: 1.5,
                                    color: 'rgb(16, 57, 150)',
                                    backgroundImage:
                                        'linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)',
                                }}
                            >
                                <AttachMoneyOutlinedIcon sx={{ fontSize: 40 }} />
                            </Icon>
                            <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#061B64' }}>
                                100K
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 300, opacity: 0.72, fontSize: '0.875rem', color: '#061B64' }}
                            >
                                Total Sales
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default AdminDashboard;

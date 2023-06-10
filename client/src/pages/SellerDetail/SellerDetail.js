import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function SellerDetail() {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Stack gap={7} marginLeft={25} marginRight={25} marginTop={5} marginBottom={5} width="90%">
            <Stack direction="row" gap={2} sx={{ cursor: 'pointer' }}>
                <Link to="/seller_management">
                    <ArrowBackIcon fontSize="large" />
                </Link>
                <Link to="/seller_management">
                    <Typography
                        variant="body1"
                        gutterBottom
                        fontSize="24px"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        sx={{ textDecoration: isHovered ? 'underline' : 'none' }}
                    >
                        Sellers
                    </Typography>
                </Link>
            </Stack>

            <Stack direction="row" gap={2} alignItems="center">
                <Avatar
                    alt="Remy Sharp"
                    src="https://s1.media.ngoisao.vn/news/2022/04/19/4da578dae741291f7050-ngoisaovn-w1126-h1612.jpg"
                    sx={{ width: 60, height: 60 }}
                />

                <Stack direction="column" justifyContent="center">
                    <Typography variant="h5" gutterBottom fontWeight="700">
                        ngantvh@gmail.com
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom fontWeight="500" fontSize="18px">
                        user_id: <Chip label="5e86805e2bafd54f66cc95c3" sx={{ marginLeft: '10px' }} />
                    </Typography>
                </Stack>
            </Stack>

            <Paper
                variant="outlined"
                sx={{ padding: '30px 50px', width: '70%', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
                <Typography variant="h6" gutterBottom margin={0}>
                    Edit Sellers
                </Typography>

                <Stack direction="column" gap={5} width="90%" marginTop={5}>
                    <TextField required id="outlined-required" label="Tên" defaultValue="Wang ZiQi" size="small" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        defaultValue="ngantvh@gmail.com"
                        size="small"
                        type="email"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Số điện thoại"
                        defaultValue="0199907893"
                        size="small"
                        type="tel"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Địa chỉ"
                        defaultValue="Vinhome Grand Park, TP HCM"
                        size="small"
                    />
                </Stack>
                <Stack direction="row" gap={2} alignItems="center" marginTop={5}>
                    <Button variant="soft" size="lg">
                        Update
                    </Button>
                    <Link to="/seller_management">
                        <Button variant="plain" size="lg">
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Paper>

            <Paper sx={{ padding: '30px 50px', width: '70%', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}>
                <Typography variant="h6" gutterBottom>
                    Data Management
                </Typography>
                <Button color="danger" variant="outlined" sx={{ marginTop: 1 }} onClick={handleClickOpen} size="lg">
                    Delete Account
                </Button>
                <Typography variant="body2" marginTop={2} color="rgb(108, 115, 127)">
                    Remove this customer’s chart if he requested that, if not please be aware that what has been deleted
                    can never brought back
                </Typography>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Bạn có chắc chắn muốn xóa không?'}</DialogTitle>
                    <DialogActions>
                        <Stack direction="row">
                            <Button variant="plain" onClick={handleClose}>
                                Không
                            </Button>
                            <Button variant="plain" onClick={handleClose} autoFocus>
                                Có
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Stack>
    );
}

export default SellerDetail;

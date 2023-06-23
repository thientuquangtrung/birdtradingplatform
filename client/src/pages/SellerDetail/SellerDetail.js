import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/joy';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { enqueueSnackbar } from 'notistack';
import { FormControl, FormControlLabel, IconButton, Modal, Radio, RadioGroup } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

function SellerDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [user, setUser] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [banReasons, setBanReasons] = useState([]);

    const [isUserActive, setIsUserActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(function () {
        axiosClient
            .get(`auth/account/${location.state.id}`, {
                params: {
                    role: 'SELLER',
                },
            })
            .then(function (response) {
                const fetchUser = response.data.data;
                setUser(fetchUser);
                setName(fetchUser.name);
                setEmail(fetchUser.email);
                setPhone(fetchUser.phone);
                setAddress(fetchUser.pickUpAddress);
                setIsUserActive(fetchUser.enabled);
            })
            .catch(function (error) {
                console.log(error);
            });

        axiosClient
            .get('account/ban_reason', {
                params: {
                    role: 'SELLER',
                },
            })
            .then((response) => {
                // console.log(response);
                setBanReasons(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white', // Update the background color here
        border: 'none',
        boxShadow: 24,
        paddingBottom: 2,
        paddingTop: 2,
        paddingRight: 3,
        paddingLeft: 3,
        borderRadius: 2,
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleDelete = () => {
        axiosClient
            .delete(`auth/account/${location.state.id}`, {
                params: {
                    bannedId: selectedValue,
                },
            })
            .then(function (response) {
                // handle success
                enqueueSnackbar('Đã xóa thành công', {
                    variant: 'success',
                });
                navigate('/seller_management');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };
    function handleUpdate() {
        axiosClient
            .patch('auth/account', {
                id: user.id,
                email,
                name,
                phone,
                address,
                role: 'SELLER',
            })
            .then((response) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
                navigate('/seller_management');
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

            {user && (
                <>
                    <Stack direction="row" gap={2} alignItems="center">
                        <Avatar alt="Remy Sharp" src={user.image} sx={{ width: 60, height: 60 }} />

                        <Stack direction="column" justifyContent="center">
                            <Typography variant="h5" gutterBottom fontWeight="700">
                                {user.email}
                            </Typography>
                            <Typography variant="body2" display="block" gutterBottom fontWeight="500" fontSize="18px">
                                user_id: <Chip label={user.id} sx={{ marginLeft: '10px' }} />
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
                            <TextField
                                required
                                id="outlined-required"
                                label="Tên"
                                defaultValue={user.name}
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue={user.email}
                                size="small"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Số điện thoại"
                                defaultValue={user.phone}
                                size="small"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Địa chỉ"
                                defaultValue={user.pickUpAddress}
                                size="small"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" gap={2} alignItems="center" marginTop={5}>
                            <Button variant="soft" size="lg" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Link to="/seller_management">
                                <Button variant="plain" size="lg">
                                    Cancel
                                </Button>
                            </Link>
                        </Stack>
                    </Paper>
                </>
            )}

            <Paper sx={{ padding: '30px 50px', width: '70%', boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}>
                <Typography variant="h6" gutterBottom>
                    Data Management
                </Typography>
                <Button
                    color="danger"
                    variant="outlined"
                    sx={{
                        marginTop: 1,
                        '&:disabled': {
                            bgcolor: '#eeeeee',
                            color: 'grey',
                        },
                    }}
                    onClick={handleClickOpen}
                    size="lg"
                    disabled={!isUserActive}
                >
                    Delete Account
                </Button>
                <Typography variant="body2" marginTop={2} color="rgb(108, 115, 127)">
                    Remove this seller’s chart if he requested that, if not please be aware that what has been deleted
                    can never brought back
                </Typography>
                {/* <Dialog
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
                            <Button variant="plain" onClick={handleDelete} autoFocus>
                                Có
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                                marginTop={1}
                            >
                                <Typography></Typography>
                                <Typography
                                    style={{ marginLeft: '50px' }}
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Khóa Tài Khoản
                                </Typography>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <FormControl>
                                <RadioGroup
                                    value={selectedValue}
                                    onChange={handleChange}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    {banReasons.length > 0 &&
                                        banReasons.map((reasonItem) => (
                                            <FormControlLabel
                                                key={reasonItem.id}
                                                sx={{ paddingBottom: 2 }}
                                                value={reasonItem.id}
                                                control={<Radio />}
                                                label={reasonItem.reason}
                                            />
                                        ))}
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <div
                            style={{
                                textAlign: 'right',
                                paddingRight: '10px',
                            }}
                        >
                            <Button disabled={selectedValue === 0} color="danger" onClick={handleDelete}>
                                XÁC NHẬN
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </Paper>
        </Stack>
    );
}

export default SellerDetail;

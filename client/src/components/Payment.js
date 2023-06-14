import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/joy/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { Stack } from '@mui/system';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const paymentOptions = [
    {
        label: 'Thanh toán khi nhận hàng',
        image: 'https://img.freepik.com/premium-vector/bag-money-logo-template-sack-money-vector-illustration_23987-343.jpg?w=2000',
        value: 'COD',
    },
    {
        label: 'Thanh toán bằng Ví MoMo',
        image: 'https://atc-edge11.mservice.com.vn/app/img/portal_documents/mini-app_design-guideline_branding-guide-2-2.png',
        value: 'MOMO',
    },
    {
        label: 'Thanh toán bằng PayPal',
        image: 'https://static.vecteezy.com/system/resources/previews/020/190/502/original/paypal-logo-paypal-logo-free-free-vector.jpg',
        value: 'PAYPAL',
    },
    {
        label: 'Thanh toán bằng Ví VNPay',
        image: 'https://play-lh.googleusercontent.com/o-_z132f10zwrco4NXk4sFqmGylqXBjfcwR8-wK0lO1Wk4gzRXi4IZJdhwVlEAtpyQ',
        value: 'VNPAY',
    },
];

export default function Payment({ selectedOption, setSelectedOption }) {
    const [open, setOpen] = React.useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" variant="outlined" onClick={handleClickOpen}>
                Chọn phương thức thanh toán
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ padding: 10 }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Phương thức thanh toán
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl>
                        <RadioGroup
                            aria-label="payment-options"
                            name="payment-options"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <Stack direction="column" gap={2} sx={{ paddingRight: 15 }}>
                                {paymentOptions.map((payment, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={JSON.stringify(payment)}
                                        control={<Radio sx={{ paddingLeft: 5 }} />}
                                        label={
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <img width={50} height={50} src={payment.image} alt="" />
                                                <Typography>{payment.label}</Typography>
                                            </Stack>
                                        }
                                    />
                                ))}
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button  size="sm" variant="soft" color="primary" autoFocus onClick={handleClose} sx={{ marginRight: 1 }}>
                        Xác nhận
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

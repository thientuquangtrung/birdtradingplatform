import { MenuItem, Typography } from '@mui/material';


function CartItem() {
    return (
        <MenuItem sx={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: '350px',
            height: '60px',
        }}>
            <img style={{ width: '50px', height: '40px' }} src="/assets/images/logo.png" alt="" />
            <Typography maxWidth={300} noWrap textOverflow={'ellipsis'} ml={2} textAlign={'start'} flex={1} variant="subtitle2" component="p">
                lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem
            </Typography>
            <Typography ml={2} variant="body1" component="span" color="Highlight">
                1.200.000
            </Typography>
        </MenuItem>
    );
}

export default CartItem;

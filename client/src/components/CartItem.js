import { MenuItem, Typography } from '@mui/material';

function CartItem({ data }) {
    return (
        <MenuItem
            sx={{
                display: 'flex',
                flexDirection: 'row',
                minWidth: '350px',
                height: '60px',
            }}
        >
            <img style={{ width: '50px', height: '40px' }} src={data.image} alt="" />
            <Typography
                maxWidth={300}
                noWrap
                textOverflow={'ellipsis'}
                ml={2}
                textAlign={'start'}
                flex={1}
                variant="subtitle2"
                component="p"
            >
                {data.name}
            </Typography>
            <Typography ml={2} variant="body1" component="span" color="Highlight">
                {data.price}
            </Typography>
        </MenuItem>
    );
}

export default CartItem;

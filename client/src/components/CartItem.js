import { MenuItem, Typography } from '@mui/material';

function CartItem({ data }) {
    return (
        <MenuItem
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '60px',
            }}
        >
            <img style={{ width: '50px', height: '40px', objectFit: 'cover' }} src={data.image} alt="" />
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
            <Typography ml={2} variant="body1" component="span" color="#43a99c">
                {data.price.toLocaleString('vi-VN')}₫
            </Typography>
        </MenuItem>
    );
}

export default CartItem;

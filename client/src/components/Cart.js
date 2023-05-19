import { Box, Button, MenuList, Paper, Stack, Typography } from "@mui/material";
import CartItem from "./CartItem";

function Cart() {
    return (
        <Paper>
            <Stack p>
                <Box mb={1} mt={1}>
                    <Typography variant="subtitle1">Sản phẩm mới thêm</Typography>
                </Box>
                <MenuList mb={1}>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </MenuList>
                <Stack>
                    <Button variant="contained" color="primary">Xem giỏ hàng</Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Cart;
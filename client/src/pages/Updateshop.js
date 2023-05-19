import {
    Paper,
    createTheme,
    Typography,
    ThemeProvider,
    Button,
    TextField,
    Stack,
    Box,
    colors
} from "@mui/material";
import React, { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { grey, orange } from "@mui/material/colors";

export default function Updateshop() {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: orange[800]
            }
        }
    });

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Paper>
            <ThemeProvider theme={theme}>
                <Box marginBottom={2} marginRight={2} marginTop={2} >
                    <Typography marginLeft={2} variant="h4" gutterBottom>Hồ Sơ Shop</Typography>
                    <Typography marginLeft={2} color='#9e9e9e' gutterBottom>
                        Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
                    </Typography>
                    <Typography marginLeft={2} variant="h6" color="primary" gutterBottom>
                        Thông tin cơ bản
                    </Typography>
                </Box>
                <div>
                    <Stack marginBottom={1} direction="row" spacing={3} justifyContent={"left"} marginLeft={2} >
                        <Typography paddingTop={2}>Tên Shop</Typography>
                        <TextField margin="" id="outlined-search" label="Tên Shop" type="search" variant="outlined" />
                    </Stack>
                    <Stack marginBottom={1} direction="row" spacing={2.4} justifyContent={"left"} marginLeft={2}>
                        <Typography paddingTop={2}>Shop Logo</Typography>
                        <TextField id="outlined-search" label="JPG/JPEG/PNG" type="search" variant="outlined" />
                    </Stack>
                    <Stack marginBottom={1} direction="row" spacing={1.7} justifyContent={"left"} marginLeft={2}>
                        <Typography paddingTop={2}>Mô Tả Shop</Typography>
                        <TextField id="outlined-search" label="Thông tin mô tả" type="search" variant="outlined" />
                    </Stack>
                </div>
                <div style={{marginBottom: '10px' ,display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Button color="primary" variant="contained">Lưu</Button>
                </div>
            </ThemeProvider>
        </Paper>
        </div>

    );
}


import React, { useState } from 'react';
import {
    Paper,
    createTheme,
    Typography,
    ThemeProvider,
    Button,
    TextField,
    Stack,
    Box,
} from "@mui/material";
import { orange } from "@mui/material/colors";

export default function Updateshop() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Tạo URL cho hình ảnh đã chọn
        const imageURL = URL.createObjectURL(file);
        setImageURL(imageURL);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            // Gửi tệp lên máy chủ hoặc xử lý tệp theo nhu cầu của ứng dụng
            console.log('Đã chọn tệp:', selectedFile);
        } else {
            console.log('Chưa chọn tệp');
        }
    };

    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: orange[800]
            }
        }
    });

    return (
        <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', padding: 3 }}>
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
                    <Stack marginBottom={2} direction="row" spacing={3.8} justifyContent={"left"} marginLeft={2} >
                        <Typography marginBottom={2} paddingTop={2}>Tên Shop</Typography>
                        <TextField margin="" id="outlined-search" label="Tên Shop" type="search" variant="outlined" />
                    </Stack>
                    <Stack marginBottom={1} direction="row" spacing={2.8} justifyContent={"left"} marginLeft={2}>
                        <Typography >Shop Logo</Typography>
                        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                            <input type="file" onChange={handleFileChange} />
                            {imageURL && <img src={imageURL} alt="Hình ảnh tải lên" style={{ width: '100px', height: '100px' }} />}
                        </div>
                    </Stack>
                    <Stack marginBottom={1} direction="row" spacing={1.7} justifyContent={"left"} marginLeft={2} paddingTop='10px'>
                        <Typography paddingTop={2}>Mô Tả Shop</Typography>
                        <TextField id="outlined-search" label="Thông tin mô tả" type="search" variant="outlined" />
                    </Stack>
                </div>
                <div style={{ marginBottom: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button color="primary" variant="contained">Lưu</Button>
                </div>
            </ThemeProvider>
        </Paper>
    );
}

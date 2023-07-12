import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import { Stack, TextField } from '@mui/material';
import { AspectRatio, IconButton } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/joy/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import axiosClient from '../api/axiosClient';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function InteractiveCard({ initialData }) {
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [data, setData] = useState(initialData);
    const [name, setName] = useState(data.name);
    const [textFieldValue, setTextFieldValue] = useState(data.name);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axiosClient
            .delete(`category/${data.id}`)
            .then(function (response) {
                // handle success
                setChange(true);
                setOpen(false);
                //setChange(true) được gọi để cập nhật trạng thái change thành true, 
                //chỉ ra rằng dữ liệu đã thay đổi.
                //setOpen(false) được gọi để đóng hộp thoại xác nhận xóa.
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const handleSave = () => {
        if (textFieldValue !== name) {
            setName(textFieldValue); 
            //được gọi để cập nhật tên của thẻ thành giá trị trong trường văn bản.
            axiosClient
                .put(`category/${data.id}`, { name: textFieldValue })
                .then((response) => {
                    console.log(response);
                    setName(textFieldValue);
                    //được gọi để cập nhật tên của thẻ thành giá trị trong trường văn bản.
                    setChange(false);
                    // được gọi để cập nhật trạng thái change thành false, chỉ ra rằng dữ liệu không thay đổi.
                    setData((prevData) => ({
                        ...prevData,
                        enabled: true,
                    //được sử dụng để cập nhật dữ liệu của thẻ với trạng thái enabled là true.    
                    }));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setEditMode(false);
    };

    const handleTextFieldChange = (e) => {
        setTextFieldValue(e.target.value);
        //e.target.value truy cập giá trị mới 
        //=> cập nhật giá trị của textFieldValue vào 
    };

    const cardColor = change || data.enabled === false ? '#e0e0e0' : undefined;
    const tagChange =
        change || data.enabled === false ? (
            <IconButton disabled size="sm" color="neutral">
                <VisibilityOffIcon />
            </IconButton>
        ) : (
            <IconButton color="neutral" variant="outlined" size="sm" onClick={handleClickOpen}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        );

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                backgroundColor: cardColor,
            }}
        >
            <Stack direction="row" justifyContent="space-between" justifyItems="center" gap={2}>
                <AspectRatio ratio="1" sx={{ width: 90, height: 90 }}>
                    <img
                        src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                        srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <Stack direction="column" gap={2} alignItems="center">
                        {editMode ? (
                            <TextField
                                value={textFieldValue}
                                onChange={handleTextFieldChange}
                                variant="outlined"
                                size="small"
                                autoFocus
                            />
                        //editMode là true, sẽ hiển thị TextField để cho phép người dùng chỉnh sửa giá trị    
                        ) : (
                            <Chip variant="soft" color="neutral" size="lg" sx={{ pointerEvents: 'none' }}>
                                {name}
                            </Chip>
                        )}
                        {/* editMode là false, sẽ hiển thị Chip để hiển thị giá trị tĩnh. */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                            {editMode ? (
                                //editMode là true => nút "Lưu" sẽ được hiển thị.
                                <IconButton
                                    color="neutral"
                                    variant="outlined"
                                    size="sm"
                                    disabled={textFieldValue === name}
                                    //Nếu giá trị textFieldValue trùng với name, nút sẽ bị vô hiệu hóa.
                                    onClick={handleSave}
                                >
                                    <DoneIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                //editMode là true => nút "Chỉnh sửa" sẽ được hiển thị.
                                <IconButton
                                    color="neutral"
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setEditMode(true)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )}
                            {editMode ? (
                                //editMode là true => nút "Đóng" sẽ được hiển thị.
                                <IconButton
                                    color="neutral"
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => setEditMode(false)}
                                    //cho phép người dùng thoát khỏi chế độ chỉnh sửa.
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                tagChange
                            )}
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {'Bạn có chắc chắn muốn xóa staff không?'}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Không</Button>
                                    <Button autoFocus onClick={handleDelete}>
                                        Có
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
}

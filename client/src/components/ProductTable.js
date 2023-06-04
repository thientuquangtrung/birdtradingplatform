import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';
import { enqueueSnackbar } from 'notistack';

const Actions = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axiosClient
            .delete(`seller/product/${data.value}`)
            .then(function (response) {
                // handle success
                enqueueSnackbar('Đã xóa sản phẩm thành công', { variant: 'success' });
                setOpen(false);
            })
            .catch(function (error) {
                // handle error
                handleError(error);
            });
    };

    return (
        <Stack direction="row" spacing={0.5}>
            <React.Fragment>
                <Link
                    to={{
                        pathname: `/product/update/${data.value}`,
                    }}
                >
                    <IconButton color="primary" aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
                <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Bạn có chắc chắn muốn xóa sản phẩm không?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Hành động này không thể phục hồi.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Không</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Có
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Stack>
    );
};

const columns = [
    {
        field: 'image',
        headerName: 'Hình ảnh',
        width: 100,
        renderCell: (rowData) => (
            <img src={rowData.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        ),
        headerAlign: 'center',
        align: 'center',
    },
    { field: 'name', headerName: 'Tên sản phẩm', width: 140 },
    { field: 'price', headerName: 'Giá', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'description', headerName: 'Mô tả', width: 200 },
    {
        field: 'enabled',
        headerName: 'Trạng thái',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: (rowData) => {
            if (rowData.value === true) {
                return <Chip icon={<DoneIcon />} label="active" variant="outlined" size="small" color="primary" />;
            } else {
                return <Chip icon={<CloseIcon />} label="inactive" variant="outlined" size="small" />;
            }
        },
    },
    {
        field: 'id',
        headerName: 'Thao tác',
        headerAlign: 'center',
        align: 'center',
        width: 200,
        renderCell: (rowAction) => <Actions data={rowAction} />,
    },
];

export default function ProductTable({ rows = [] }) {
    if (rows.length > 0) {
        rows.forEach((row) => {
            delete row.shopId;
            delete row.categoryId;
        });
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

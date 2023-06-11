import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const Name = ({ data }) => {
    return (
        <Stack direction="row" gap={2} alignItems="center">
            <Avatar alt="" src={data.image} sx={{ width: 40, height: 40 }} />
            <Stack direction="column" justifyContent="center">
                <Typography variant="subtitle2" gutterBottom margin={0}>
                    {data.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {data.email}
                </Typography>
            </Stack>
        </Stack>
    );
};

const Actions = ({ data }) => {
    return (
        <Stack direction="row" spacing={0.5}>
            <React.Fragment>
                <Link
                    to={{
                        pathname: '/seller_detail/:name',
                    }}
                >
                    <IconButton color="primary" aria-label="edit" sx={{ color: '#000' }}>
                        <EditIcon />
                    </IconButton>
                </Link>
            </React.Fragment>
        </Stack>
    );
};

const Location = ({ data }) => {
    return (
        <Typography variant="body1" gutterBottom fontSize="14px">
            {data.value}
        </Typography>
    );
};

export default function SellerTable({ data }) {
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
            renderCell: (rowData) => <Name data={rowData.row} />,
        },
        {
            field: 'pickUpAddress',
            headerName: 'Location',
            width: 300,
            renderCell: (rowLocation) => <Location data={rowLocation} />,
            editable: true,
        },
        {
            field: 'enabled',
            headerName: 'Status',
            width: 200,
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
            headerName: 'Action',
            width: 110,
            renderCell: (rowAction) => <Actions data={rowAction} />,
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

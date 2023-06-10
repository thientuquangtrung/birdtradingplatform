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
            <Avatar
                alt="Remy Sharp"
                src="https://s1.media.ngoisao.vn/news/2022/04/19/4da578dae741291f7050-ngoisaovn-w1126-h1612.jpg"
                sx={{ width: 40, height: 40 }}
            />
            <Stack direction="column" justifyContent="center">
                <Typography variant="subtitle2" gutterBottom margin={0}>
                    Wang ZiQi
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    ngantvh@gmail.com
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
export default function SellerTable() {
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
            renderCell: (rowName) => <Name data={rowName} />,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 300,
            renderCell: (rowData) => (
                <Typography variant="body1" gutterBottom fontSize="14px">
                    Vinhomes Grand Park, TP HCM
                </Typography>
            ),
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

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
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

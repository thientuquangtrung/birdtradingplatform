import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';

const columns = [
    {
        field: 'image',
        headerName: 'Hình ảnh',
        width: 100,
        renderCell: (rowData) => <img src={rowData.value} style={{ width: '100%', height: '100%' }} alt="" />,
    },
    { field: 'name', headerName: 'Tên sản phẩm', width: 180 },
    { field: 'price', headerName: 'Giá', width: 100 },
    { field: 'description', headerName: 'Mô tả', width: 190 },
    {
        field: 'action',
        headerName: 'Thao tác',
        width: 100,
    },
];

export default function ProductTable({ rows = [] }) {
    if (rows.length > 0) {
        rows.forEach((row) => {
            delete row.shopId;
            delete row.categoryId;

            row.action = 'Cập nhật';
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

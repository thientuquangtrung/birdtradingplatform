import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
        field: 'image',
        headerName: 'Hình ảnh',
        renderCell: (rowData) => <img src={rowData.value} style={{ width: '100%' }} />,
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

// const rows = [
//   { id: 1, name: 'bird', sale: '0', price: '100.000', status: 'Cập nhật' },
//   { id: 2, name: 'bird', sale: '0', price: '200.000', status: 'Cập nhật' },
//   { id: 3, name: 'bird', sale: '0', price: '150.000', status: 'Cập nhật' },
//   { id: 4, name: 'bird', sale: '0', price: '180.000', status: 'Cập nhật' },
//   { id: 5, name: 'bird', sale: '0', price: '120.000', status: 'Cập nhật' },
//   { id: 6, name: 'bird', sale: '0', price: '0', status: 'Cập nhật' },
//   { id: 7, name: 'bird', sale: '0', price: '300.000', status: 'Cập nhật' },
//   { id: 8, name: 'bird', sale: '0', price: '270.000', status: 'Cập nhật' },
//   { id: 9, name: 'bird', sale: '0', price: '50.000', status: 'Cập nhật' },
// ];

export default function ProductTable({ rows = [] }) {
    if (rows.length > 0) {
        rows.map((row) => {
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
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}

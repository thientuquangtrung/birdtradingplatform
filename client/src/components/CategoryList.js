import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';

import axiosClient from '../api/axiosClient';

function CategoryList({ categoryId, setCategoryId }, ref) {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axiosClient
            .get('category')
            .then(function (response) {
                // handle success
                setCategoryList(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel required id="demo-simple-select-label">
                Phân loại
            </InputLabel>
            <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Phân loại"
                onChange={(e) => setCategoryId(e.target.value)}
            >
                {categoryList.length > 0 &&
                    categoryList.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}

export default forwardRef(CategoryList);

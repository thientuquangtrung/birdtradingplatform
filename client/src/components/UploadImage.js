import { Button, Typography } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { useState } from 'react';
import { Stack } from '@mui/system';
import { forwardRef } from 'react';

function UploadImage({ inputName, rounded, reverse, title }, ref ) {
    const [uploadFile, setUploadFile] = useState('');

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadFile(url);
        }
    };

    return (
        <Stack direction={reverse ? 'row' : 'row-reverse'} alignItems="center" gap={2} justifyContent='center'>
            <Stack
                justifyContent="center"
                sx={{
                    width: '100px',
                    height: '100px',
                    border: '1px dashed grey',
                    borderRadius: rounded ? '50%' : '0',
                    overflow: 'hidden',
                }}
            >
                {!uploadFile && <Typography variant="caption">JPEG/JPG/PNG</Typography>}
                {uploadFile && (
                    <img src={uploadFile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
            </Stack>
            <Button variant="outlined" component="label" color="primary" startIcon={<FileUpload />}>
                {title ? title : "Upload a file"}
                <input ref={ref} type="file" name={inputName} hidden accept="image/*" onChange={handleSelectFile} />
            </Button>
        </Stack>
    );
}

export default forwardRef(UploadImage);

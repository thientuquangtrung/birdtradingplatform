import { Button, Typography } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Stack } from '@mui/system';

function UploadImage({ inputName, rounded, reverse }) {
    const [uploadFile, setUploadFile] = useState('');

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadFile(url);
        }
    };

    return (
        <Stack direction={reverse ? 'row' : 'row-reverse'} alignItems="center" gap={2}>
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
                Upload a file
                <input type="file" name={inputName} hidden accept="image/*" onChange={handleSelectFile} />
            </Button>
        </Stack>
    );
}

export default UploadImage;

import { Button, Typography } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { useState } from 'react';

function UploadImage({ inputName, rounded, reverse, vertical, title, uploadFile, setUploadFile }) {
    const [link, setLink] = useState('');

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadFile(file);
            setLink(url);
        }
    };

    let direction = 'row';
    if (vertical) {
        direction = 'column';
    }

    if(reverse) {
        direction += '-reverse';
    }

    return (
        <Stack direction={direction} alignItems="center" gap={2} justifyContent="center">
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
                {uploadFile && !link && (
                    <img src={uploadFile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                {uploadFile && link && (
                    <img src={link} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
            </Stack>
            <Button variant="outlined" component="label" color="primary" startIcon={<FileUpload />}>
                {title ? title : 'Upload a file'}
                <input type="file" name={inputName} hidden accept="image/*" onChange={handleSelectFile} />
            </Button>
        </Stack>
    );
}

export default UploadImage;

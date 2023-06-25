import Input from '@mui/joy/Input';
import { Stack } from '@mui/system';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/joy/Button';

function CreateCategory() {
    return (
        <Stack direction="column" alignItems="center" gap={2} sx={{width: '100%'}} >
            <Stack direction='row' gap={1} >
                <Input color="neutral" placeholder="Nhap Category" size="sm" fullWidth/>

                <IconButton color="success" variant="outlined" size="sm">
                    <CheckIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Button fullWidth variant="soft" color='neutral' size='sm'>Close</Button>
            
        </Stack>
    );
}

export default CreateCategory;

import {
    Avatar,
    Box,
    Stack,
    Typography,
} from '@mui/material';
import PersonalInfo from './PersonalInfo';
import Tippy from '@tippyjs/react/headless';
import { useRef } from 'react';

function AvaText() {

    const _ref = useRef();

    return (
        <Tippy
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <Box tabIndex="-1" {...attrs}>
                    <PersonalInfo />
                </Box>
            )}
        >
            <Stack ref={_ref} direction="row" spacing={1} alignItems="center">
                <Avatar
                    sx={{ width: 26, height: 26 }}
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/2.jpg"
                />

                <Typography variant="body2" component="span">
                    trungdeptrai
                </Typography>
            </Stack>
        </Tippy>
    );
}

export default AvaText;

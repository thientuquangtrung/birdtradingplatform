import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Stack } from '@mui/system';
import { AspectRatio, Link } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';

export default function InteractiveCard({ data }) {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <Stack direction='row' justifyContent='space-between' justifyItems='center' gap={2} >
                <AspectRatio ratio="1" sx={{ width: 90, height: 90 }}>
                    <img
                        src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                        srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <Stack direction="column" gap={2} alignItems="center">
                        <Chip variant="soft" color="neutral" size="lg" sx={{ pointerEvents: 'none' }}>
                            {data.name}
                        </Chip>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                            <IconButton color="neutral" variant="outlined" size="sm">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton color="neutral" variant="outlined" size="sm">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
}

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

export default function InteractiveCard({ data }) {
    return (
        // <Card

        //     variant="outlined"
        //     orientation="horizontal"
        //     sx={{
        //         '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        //     }}
        // >
        //     <Stack  direction='row' alignItems='center' margin='0 auto'>
        //         {/* <Typography level="h2" fontSize="sm" id="card-description" mb={0.5}>
        //             {data.id}
        //         </Typography> */}
        //         {/* <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
        //             <Link overlay underline="none" href="#interactive-card" sx={{ color: 'text.tertiary' }}>
        //                 California, USA
        //             </Link>
        //         </Typography> */}
        //         <Chip variant="soft" size="lg" sx={{ pointerEvents: 'none', margin: '0 auto' }}>
        //             {data.id}. {data.name}
        //         </Chip>
        //     </Stack>
        // </Card>

        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent>
                {/* <Typography level="h2" fontSize="40px" id="card-description" mb={0.5}>
                    {data.id}
                </Typography> */}
                {/* <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                    <Link overlay underline="none" href="#interactive-card" sx={{ color: 'text.tertiary' }}>
                        California, USA
                    </Link>
                </Typography> */}
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
        </Card>
    );
}

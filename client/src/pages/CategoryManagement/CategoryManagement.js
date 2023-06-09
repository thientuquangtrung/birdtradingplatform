import { AspectRatio, Card, IconButton, Typography } from '@mui/joy';
import { CardContent, Grid } from '@mui/material';
import InteractiveCard from '../../components/InteractiveCard';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import AddIcon from '@mui/icons-material/Add';

function CategoryManagement() {
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid item xs={4}>
                <InteractiveCard />
            </Grid>
            <Grid item xs={4}>
                <InteractiveCard />
            </Grid>
            <Grid item xs={4}>
                <InteractiveCard />
            </Grid>
            <Grid item xs={4}>
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        width: 320,
                        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                    }}
                >
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <CategoryTwoToneIcon color="info" />
                    </AspectRatio>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography level="h2" fontSize="lg" mb={0.5}>
                            Add new category
                        </Typography>
                        <IconButton variant="outlined">
                            <AddIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default CategoryManagement;

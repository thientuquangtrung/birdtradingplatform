import { Button } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';

function Home() {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={1.5}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <Button variant="outlined">
            Xem Thêm
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Home;

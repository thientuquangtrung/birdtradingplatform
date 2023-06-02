import { Container } from '@mui/material';
import { CartContextProvider } from '../../contexts/CartContext';
import Footer from '../layoutComponents/Footer/Footer';
import Header from '../layoutComponents/Header/Header';

function DefaultLayout({ children }) {
    return (
        <CartContextProvider>
            <Header />
            <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>{children}</Container>
            <Footer />
        </CartContextProvider>
    );
}

export default DefaultLayout;

import { Container } from "@mui/material";
import Footer from "../layoutComponents/Footer/Footer";
import Header from "../layoutComponents/Header/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

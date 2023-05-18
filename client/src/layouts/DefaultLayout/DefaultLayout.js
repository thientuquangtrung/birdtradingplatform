import Footer from "../layoutComponents/Footer/Footer";
import Header from "../layoutComponents/Header/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;

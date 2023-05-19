// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';
import NewProduct from '../pages/NewProduct/NewProduct';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/newproduct', component: NewProduct, layout: DefaultLayout }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
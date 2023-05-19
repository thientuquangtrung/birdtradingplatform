// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: SellerLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
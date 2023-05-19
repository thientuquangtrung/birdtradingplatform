// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import Login from '../pages/Home/Login';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';
import Updateshop from '../pages/Updateshop.js';
import NewProduct from '../pages/NewProduct/NewProduct';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    {path: '/login', component: Login, layout:DefaultLayout}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Home/Login';
import Signup from '../pages/Home/Signup';
import UpdateShop from '../pages/UpdateShop/UpdateShop.js';
import NewProduct from '../pages/NewProduct/NewProduct';
import ListProduct from '../pages/ListProduct/ListProduct';
import ProductDetail from '../pages/ProductDetail/ProductDetail';


// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/signup', component: Signup, layout: AuthLayout },
    { path: '/shop/profile', component: UpdateShop, layout: SellerLayout },
    { path: '/product/new', component: NewProduct, layout: SellerLayout },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout },
    { path: '/product/detail', component: ProductDetail, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';
import Updateshop from '../pages/Updateshop.js';
import NewProduct from '../pages/NewProduct/NewProduct';
import ListProduct from '../pages/ListProduct/ListProduct';
import ProductDetail from '../pages/ProductDetail/ProductDetail';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/product/new', component: NewProduct, layout: SellerLayout },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout },
    { path: '/shop/profile', component: Updateshop, layout: SellerLayout },
    { path: '/product/detail', component: ProductDetail, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

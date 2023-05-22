// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import Login from '../pages/Home/Login';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';
import Updateshop from '../pages/Updateshop.js';
<<<<<<< HEAD
import NewProduct from '../pages/NewProduct/NewProduct';
import ListProduct from '../pages/ListProduct/ListProduct';
=======

>>>>>>> 807e091 (updateshop)

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    {path: '/login', component: Login, layout:DefaultLayout}
<<<<<<< HEAD
    { path: '/product/new', component: NewProduct, layout: SellerLayout },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout },
=======
>>>>>>> 807e091 (updateshop)
    { path: '/shop/profile', component: Updateshop, layout: SellerLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

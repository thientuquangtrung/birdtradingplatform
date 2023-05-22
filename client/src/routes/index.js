// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';

import SellerLayout from '../layouts/SellerLayout/SellerLayout';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Home/Login';
import Signup from '../pages/Home/Signup';
import Updateshop from '../pages/Updateshop.js';
<<<<<<< HEAD
import NewProduct from '../pages/NewProduct/NewProduct';
<<<<<<< HEAD
import ListProduct from '../pages/ListProduct/ListProduct';
=======

>>>>>>> 807e091 (updateshop)
=======
import Signinup from '../pages/Home/Signinup';
>>>>>>> 5c0ff6c (login)

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
<<<<<<< HEAD
    {path: '/login', component: Login, layout:DefaultLayout}
<<<<<<< HEAD
    { path: '/product/new', component: NewProduct, layout: SellerLayout },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout },
=======
>>>>>>> 807e091 (updateshop)
    { path: '/shop/profile', component: Updateshop, layout: SellerLayout },
=======
    {path: '/signinup', component: Signinup, layout:DefaultLayout},
    

>>>>>>> 5c0ff6c (login)
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

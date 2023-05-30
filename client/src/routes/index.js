// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import UpdateShop from '../pages/UpdateShop/UpdateShop.js';
import NewProduct from '../pages/NewProduct/NewProduct';
import ListProduct from '../pages/ListProduct/ListProduct';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import SellerLogin from '../pages/Login/SellerLogin';
import SellerSignup from '../pages/Signup/SellerSignup';
import UpdateCustomer from '../pages/UpdateCustomer/UpdateCustomer';
import Shopping from '../pages/Shopping/Shopping';
import UpdateProduct from '../pages/UpdateProduct/UpdateProduct';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout, subdomain: 'common' },
    { path: '/shopping', component: Shopping, layout: DefaultLayout, subdomain: 'common' },
    { path: '/product/detail/:id', component: ProductDetail, layout: DefaultLayout, subdomain: 'common' },
    { path: '/signup', component: SellerSignup, layout: AuthLayout, subdomain: 'seller' },
    { path: '/signup', component: Signup, layout: AuthLayout, subdomain: 'common' },
    { path: '/login', component: SellerLogin, layout: AuthLayout, subdomain: 'seller' },
    { path: '/login', component: Login, layout: AuthLayout, subdomain: 'common' },
];

const privateRoutes = [
    {
        path: '/customer/profile',
        component: UpdateCustomer,
        layout: DefaultLayout,
        role: ['CUSTOMER'],
        subdomain: 'common',
    },
    { path: '/shop/profile', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' }, //homepage of seller
    { path: '/product/new', component: NewProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/product/update/:id', component: UpdateProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
];

export { publicRoutes, privateRoutes };

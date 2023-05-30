// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import SellerLayout from '../layouts/SellerLayout/SellerLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import CustomerLayout from '../layouts/CustomerLayout/CustomerLayout';

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
import UpdateCustomer1 from '../pages/UpdateCustomer/UpdateCustomer1';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout, subdomain: 'common' },
    { path: '/product/detail/:id', component: ProductDetail, layout: DefaultLayout, subdomain: 'common' },
    { path: '/signup', component: SellerSignup, layout: AuthLayout, subdomain: 'seller' },
    { path: '/signup', component: Signup, layout: AuthLayout, subdomain: 'common' },
    { path: '/login', component: SellerLogin, layout: AuthLayout, subdomain: 'seller' },
    { path: '/login', component: Login, layout: AuthLayout, subdomain: 'common' },
    { path: '/customer/profile', component: UpdateCustomer, layout: AuthLayout, subdomain: 'common' },
    { path: '/customer/profile1', component: UpdateCustomer1, layout: CustomerLayout, subdomain: 'common' },
];

const privateRoutes = [
    { path: '/shop/profile', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' }, //homepage of seller
    { path: '/product/new', component: NewProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
];

export { publicRoutes, privateRoutes };

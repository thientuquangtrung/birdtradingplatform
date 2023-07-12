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
import CartDetail from '../pages/CartDetail/CartDetail';
import Checkout from '../pages/Checkout/Checkout';
import CustomerOrders from '../pages/CustomerOrders/CustomerOrders';
import ManageOrder from '../pages/ManageOrder/ManageOder';
import RevenueManagement from '../pages/RevenueManagement/RevenueManagement';
import ShopPage from '../pages/ShopPage/ShopPage';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import SellerManagement from '../pages/SellerManagement/SellerManagement';
import CustomerManagement from '../pages/CustomerManagement/CustomerManagement';
import SellerManagementAdmin from '../pages/SellerManagementAdmin/SellerManagementAdmin';
import CategoryManagement from '../pages/CategoryManagement/CategoryManagement';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminLogin from '../pages/Login/AdminLogin';
import SellerDetail from '../pages/SellerDetail/SellerDetail';
import CustomerDetail from '../pages/CustomerDetail/CustomerDetail';
import CustomerManagementAdmin from '../pages/CustomerManagementAdmin/CustomerManagementAdmin';
import PasswordVerify from '../pages/PasswordVerify/PasswordVerify';
import PasswordChange from '../pages/PasswordChange/PasswordChange';
import EmailVerify from '../pages/EmailVerify/EmailVerify';
import OtpVerify from '../pages/OtpVerify/OtpVerify';
import PasswordForget from '../pages/PasswordForget/PasswordForget';
import PasswordReset from '../pages/PasswordReset/PasswordReset';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout, subdomain: 'common' },
    { path: '/shopping', component: Shopping, layout: DefaultLayout, subdomain: 'common' },
    { path: '/shopping/:categoryName', component: Shopping, layout: DefaultLayout, subdomain: 'common' },
    { path: '/product/detail/:name', component: ProductDetail, layout: DefaultLayout, subdomain: 'common' },
    { path: '/shop/:shopname', component: ShopPage, layout: DefaultLayout, subdomain: 'common' },
    { path: '/shop/:shopname/:categoryName', component: ShopPage, layout: DefaultLayout, subdomain: 'common' },
    { path: '/signup', component: SellerSignup, layout: AuthLayout, subdomain: 'seller' },
    { path: '/signup', component: Signup, layout: AuthLayout, subdomain: 'common' },
    { path: '/login', component: SellerLogin, layout: AuthLayout, subdomain: 'seller' },
    { path: '/login', component: Login, layout: AuthLayout, subdomain: 'common' },
    { path: '/email/verify', component: EmailVerify, layout: AuthLayout, subdomain: 'common' },
    { path: '/email/verify', component: EmailVerify, layout: AuthLayout, subdomain: 'seller' },
    { path: '/otp/verify', component: OtpVerify, layout: AuthLayout, subdomain: 'common' },
    { path: '/otp/verify', component: OtpVerify, layout: AuthLayout, subdomain: 'seller' },
    { path: '/login', component: AdminLogin, subdomain: 'admin' },
    { path: '/password/reset/:email', component: PasswordReset, layout: AuthLayout, subdomain: 'common' },
    {
        path: '/password/forget',
        component: PasswordForget,
        layout: AuthLayout,
        subdomain: 'common',
    },
];

const privateRoutes = [
    {
        path: '/profile',
        component: UpdateCustomer,
        layout: DefaultLayout,
        role: ['CUSTOMER'],
        subdomain: 'common',
    },
    {
        path: '/orders',
        component: CustomerOrders,
        layout: DefaultLayout,
        role: ['CUSTOMER'],
        subdomain: 'common',
    },
    { path: '/profile', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/', component: UpdateShop, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' }, //homepage of seller
    { path: '/product/new', component: NewProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/product/list/all', component: ListProduct, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    {
        path: '/product/update/:id',
        component: UpdateProduct,
        layout: SellerLayout,
        role: ['SELLER'],
        subdomain: 'seller',
    },
    { path: '/order/manage', component: ManageOrder, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/dashboard', component: RevenueManagement, layout: SellerLayout, role: ['SELLER'], subdomain: 'seller' },
    { path: '/cart', component: CartDetail, layout: DefaultLayout, role: ['CUSTOMER'], subdomain: 'common' },
    { path: '/cart/checkout', component: Checkout, layout: DefaultLayout, role: ['CUSTOMER'], subdomain: 'common' },
    {
        path: '/seller_management',
        component: SellerManagement,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/seller_detail/:name',
        component: SellerDetail,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/seller_management/add_seller',
        component: SellerManagementAdmin,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/customer_management',
        component: CustomerManagement,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/customer_detail/:name',
        component: CustomerDetail,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/customer_management/add_customer',
        component: CustomerManagementAdmin,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/cate_management',
        component: CategoryManagement,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/dashboard',
        component: AdminDashboard,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/',
        component: AdminDashboard,
        layout: AdminLayout,
        role: ['ADMIN'],
        subdomain: 'admin',
    },
    {
        path: '/password/verify',
        component: PasswordVerify,
        layout: AuthLayout,
        role: ['CUSTOMER'],
        subdomain: 'common',
    },
    {
        path: '/password/change',
        component: PasswordChange,
        layout: DefaultLayout,
        role: ['CUSTOMER'],
        subdomain: 'common',
    },
];

export { publicRoutes, privateRoutes };

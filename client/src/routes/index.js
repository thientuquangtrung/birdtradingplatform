// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import Login from '../pages/Home/Login';

// Pages
import Home from '../pages/Home/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    {path: '/login', component: Login, layout:DefaultLayout}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
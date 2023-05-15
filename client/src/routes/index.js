// Layouts
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';

// Pages
import Home from '../pages/Home/Home';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
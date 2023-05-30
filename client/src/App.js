import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import CheckAuth from './components/CheckAuth';
import axiosClient from './api/axiosClient';

function App() {
    const host = window.location.host;
    const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);

    const subdomain = arr.length > 0 ? arr[0] : 'common';

    const subDomainRoutes = [
        ...privateRoutes.filter((route) => route.subdomain === subdomain),
        ...publicRoutes.filter((route) => route.subdomain === subdomain),
    ];

    useEffect(() => {
        axiosClient
            .post('init_product')
            .then((response) => {})
            .catch((error) => console.log(error));
    });

    return (
        <div className="App">
            <Router>
                <Routes>
                    {subDomainRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = null;

                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    route.role ? (
                                        <CheckAuth role={route.role}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </CheckAuth>
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;

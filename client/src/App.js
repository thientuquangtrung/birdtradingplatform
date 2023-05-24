import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import CheckAuth from './components/CheckAuth';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
    return (
        <div className="App">
            <Router>
                <AuthContextProvider>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = null;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = null;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <CheckAuth>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </CheckAuth>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </AuthContextProvider>
            </Router>
        </div>
    );
}

export default App;

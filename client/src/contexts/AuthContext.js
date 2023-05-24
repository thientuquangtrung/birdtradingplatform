import PropTypes from 'prop-types';

import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            setLoading(true);
            axiosClient
                .get('auth/me')
                .then((response) => {
                    setCurrentUser(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    handleError(error);
                    setLoading(false);
                });
        }
    }, []);

    return (
        !loading && (
            <AuthContext.Provider value={{ setCurrentUser, currentUser, loading }}>{children}</AuthContext.Provider>
        )
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;

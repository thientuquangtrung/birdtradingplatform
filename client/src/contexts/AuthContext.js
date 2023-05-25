import PropTypes from 'prop-types';

import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
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
        } else {
            setLoading(false);
        }
    }, []);

    return !loading ? (
        <AuthContext.Provider value={{ setCurrentUser, currentUser, loading }}>{children}</AuthContext.Provider>
    ) : (
        <></>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;

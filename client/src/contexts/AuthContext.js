import PropTypes from 'prop-types';

import axiosClient from '../api/axiosClient';
// import handleError from '../utils/handleError';
import { createContext, useLayoutEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        setLoading(true);
        async function fetchApi() {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                try {
                    const response = await axiosClient.get('auth/me');
                    setCurrentUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
            setLoading(false);
        }
        fetchApi();
    }, []);

    return !loading ? (
        <AuthContext.Provider value={{ setCurrentUser, currentUser }}>{children}</AuthContext.Provider>
    ) : (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;

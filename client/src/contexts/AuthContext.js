import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { login as _login, signup as _signup, getCurrentUser, logout as _logout } from '../services/auth.services';

const { createContext, useState, useEffect } = require('react');

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (token) {
                const res = await getCurrentUser(token);
                
                if (res) {
                    setCurrentUser(res);
                }
            }
            setLoading(false);
        };
        fetchApi();
    }, []);

    const login = async (payload) => {
        const res = await _login(payload);

        if (res) {
            localStorage.setItem('token', res.meta.token);

            const user = await getCurrentUser(res.meta.token);
            setCurrentUser(user);

            navigate('/');
        }
    };

    const logout = async () => {
        const res = await _logout();

        if (res.status === 204) {
            localStorage.removeItem('token');
            setCurrentUser(null);
            navigate('/');
        }
    };

    const signup = async (payload) => {
        const res = await _signup(payload);

        if (res) {
            login(payload);
        }
    };

    const handleAuthAction = (trueCallback, falseCallback) => {
        if (currentUser) {
            trueCallback();
        } else {
            falseCallback();
        }
    };

    return (
        !loading && (
            <AuthContext.Provider value={{ currentUser, login, logout, signup, handleAuthAction }}>
                {children}
            </AuthContext.Provider>
        )
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLoginInfo } from '~/services/Auth/loginService';
import { logoutCurrentUser } from '~/services/Auth/logoutService';
import { getCurrentUser } from '~/services/currentUserService';
import { signupAccount } from '~/services/Auth/signupService';

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
                setCurrentUser(res);
            }
            setLoading(false);
        };
        fetchApi();
    }, []);

    const login = async (payload) => {
        const res = await getLoginInfo(payload);

        if (res) {
            localStorage.setItem('token', res.meta.token);

            const user = await getCurrentUser(res.meta.token);
            setCurrentUser(user);

            if (document.getElementById('modals-root')) {
                document.body.removeChild(document.getElementById('modals-root'));
            }

            navigate('/');
        }
    };

    const logout = async () => {
        const res = await logoutCurrentUser();

        if (res.status === 204) {
            localStorage.removeItem('token');
            setCurrentUser(null);
            navigate('/');
        }
    };

    const signup = async (payload) => {
        const res = await signupAccount(payload);

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

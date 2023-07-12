import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import axiosClient from '../api/axiosClient';

export const NotificationContext = createContext();
export const NotificationContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [notification, setNotification] = useState([]);
    const [notiLoading, setNotiLoading] = useState(false);

    useEffect(() => {
        setNotiLoading(true);
        axiosClient
            .get(`notification/${currentUser?.id}`)
            .then((response) => {
                setNotification(response.data.data);
                setNotiLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setNotiLoading(false);
            });
    }, [currentUser]);

    return (
        <NotificationContext.Provider
            value={{
                notiLoading,
                notification,
                setNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

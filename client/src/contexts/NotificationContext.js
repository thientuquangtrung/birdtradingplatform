import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import axiosClient from '../api/axiosClient';
import { SocketContext } from './SocketContext';
import handleError from '../utils/handleError';

export const NotificationContext = createContext();
export const NotificationContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [notificationList, setNotificationList] = useState([]);
    const [notiLoading, setNotiLoading] = useState(false);
    const [notificationLength, setNotificationLength] = useState(0);

    useEffect(() => {
        setNotiLoading(true);
        axiosClient
            .get(`notification/${currentUser?.id}`)
            .then((response) => {
                setNotificationList(response.data.data);
                setNotificationLength(response.data.data.length);
                setNotiLoading(false);
            })
            .catch((error) => {
                handleError(error);
                setNotiLoading(false);
            });
    }, [currentUser]);

    useEffect(() => {
        if (!socket) return;

        socket.on('getNotification', (res) => {
            setNotificationList((prev) => [res, ...prev]);
            setNotificationLength((prev) => prev + 1);
        });

        return () => {
            socket.off('getNotification');
        };
    }, [socket]);

    return (
        <NotificationContext.Provider
            value={{
                notiLoading,
                notificationList,
                notificationLength,
                setNotificationList,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

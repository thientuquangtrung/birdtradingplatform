import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import axiosClient from '../api/axiosClient';
import { io } from 'socket.io-client';

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // init socket
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [currentUser]);

    // add online user
    useEffect(() => {
        if (!socket) return;
        socket.emit('addNewUser', currentUser?.id);

        socket.on('getOnlineUsers', (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

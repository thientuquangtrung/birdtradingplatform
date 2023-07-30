import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AuthContext from './AuthContext';
import axiosClient from '../api/axiosClient';
import { SocketContext } from './SocketContext';
import handleError from '../utils/handleError';

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // get realtime message
    useEffect(() => {
        if (!socket) return;

        socket.on('getMessage', (res) => {
            console.log(res);
            if (!res.roomId.split(':').includes(currentUser?.id)) return;
            setMessages((prev) => [...prev, res]);
        });

        return () => {
            socket.off('getMessage');
        };
    }, [socket, currentChat]);

    useEffect(() => {
        const getUserChats = async () => {
            if (currentUser?.id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                axiosClient
                    .get(`chat/${currentUser.id}`)
                    .then((response) => {
                        setUserChats(response.data.data);
                        setIsUserChatsLoading(false);
                    })
                    .catch((error) => {
                        setUserChatsError(error);
                        setIsUserChatsLoading(false);
                    });
            }
        };

        getUserChats();
    }, [currentUser]);

    useEffect(() => {
        const getMessages = async () => {
            if (!currentChat) return;
            setIsMessagesLoading(true);
            setMessagesError(null);
            axiosClient
                .get(`message/${currentChat.id}`)
                .then((response) => {
                    setMessages(response.data.data);
                    setIsMessagesLoading(false);
                })
                .catch((error) => {
                    setUserChatsError(error);
                    setIsMessagesLoading(false);
                });
        };
        getMessages();
    }, [currentChat]);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        if (!firstId || !secondId) return;
        axiosClient
            .post(`chat`, {
                firstId,
                secondId,
            })
            .then((response) => {
                setUserChats((prev) => [response.data.data, ...prev]);
            })
            .catch((error) => {
                return handleError(error);
            });
    }, []);

    return (
        <ChatContext.Provider
            value={{
                socket,
                messages,
                userChats,
                isUserChatsLoading,
                userChatsError,
                currentChat,
                isMessagesLoading,
                messagesError,
                isChatOpen,
                setIsChatOpen,
                createChat,
                updateCurrentChat,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

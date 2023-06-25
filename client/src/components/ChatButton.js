import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { Stack, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ChatRoom from './ChatRoom';
import { ChatContext } from '../contexts/ChatContext';
import AuthContext from '../contexts/AuthContext';
import UserChat from './UserChat';

function ChatButton() {
    const { currentUser } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } = useContext(ChatContext);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <>
            {!isChatOpen && (
                <Button
                    variant="contained"
                    startIcon={<ForumIcon />}
                    sx={{ position: 'fixed', right: 7, bottom: 7 }}
                    onClick={handleChatToggle}
                >
                    Chat
                </Button>
            )}
            {isChatOpen && (
                <div
                    style={{
                        position: 'fixed',
                        right: 7,
                        bottom: 7,
                        width: '40vw',
                        height: '60vh',
                        background: '#fff',
                        borderRadius: 5,
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {/* Content of the chat component */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" padding={1}>
                        <Typography variant="h6" color="#1976d2" paddingLeft="8px">
                            Chat
                        </Typography>

                        <IconButton
                            aria-label="delete"
                            sx={{ position: 'absolute', top: 0, right: 8 }}
                            onClick={handleCloseChat}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Stack>
                    <Divider variant="middle" />
                    <Stack direction="row" height="100%">
                        <Stack direction="column" width="210px" height="85%" sx={{ overflowY: 'scroll' }}>
                            {isUserChatsLoading && <p>Loading chats...</p>}
                            {userChats.length > 0 &&
                                userChats.map((chat, index) => {
                                    return (
                                        <div key={index} onClick={() => updateCurrentChat(chat)}>
                                            <UserChat chat={chat} user={currentUser} />
                                        </div>
                                    );
                                })}
                        </Stack>
                        <Divider variant="fullWidth" orientation="vertical" flexItem />
                        {!currentChat ? (
                            <Stack flex={1} direction="column" gap={1} alignItems="center" padding={4} height="80%">
                                <img
                                    style={{ objectFit: 'contain' }}
                                    width="100%"
                                    height="100%"
                                    src="assets/images/Chat.png"
                                    alt=""
                                />
                                <Typography variant="poster" fontWeight={700} textAlign="center" color="#7b8593">
                                    Xin Chào!
                                </Typography>
                            </Stack>
                        ) : (
                            <Stack flex={1} direction="column" height="85%">
                                <ChatRoom />
                            </Stack>
                        )}
                    </Stack>
                </div>
            )}
        </>
    );
}

export default ChatButton;

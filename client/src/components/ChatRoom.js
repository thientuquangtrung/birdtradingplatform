import { useState, useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { Stack } from '@mui/material';
import Input from '@mui/joy/Input';
import IconButton from '@mui/material/IconButton';
import { IconButton as IconJoy } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ImageIcon from '@mui/icons-material/Image';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import AuthContext from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { useFetchRecipientUser } from '../hooks/useFetchRecipient';
import axiosClient from '../api/axiosClient';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import handleError from '../utils/handleError';

function ChatRoom() {
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const { currentUser } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, setMessages, socket } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, currentUser);
    const paperRef = useRef(null);
    const chatRoomRef = useRef(null);

    const [showPaper, setShowPaper] = useState(false);
    const [message, setMessage] = useState('');

    const [isButtonActive, setButtonActive] = useState(false);

    const handleClickOutside = (event) => {
        if (
            paperRef.current &&
            !paperRef.current.contains(event.target) &&
            chatRoomRef.current &&
            !chatRoomRef.current.contains(event.target)
        ) {
            setShowPaper(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAddCircleClick = () => {
        setShowPaper((prev) => !prev);
    };

    const handleClosePaper = () => {
        setShowPaper(false);
    };
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        setButtonActive(inputValue.trim() !== '');
    };

    const handleSendMessage = () => {
        const newMessage = {
            chatId: currentChat.id,
            senderId: currentUser.id,
            text: message,
        };
        axiosClient
            .post(`message`, newMessage)
            .then((response) => {
                setMessages((prevMessages) => [...prevMessages, response.data.data]);
                setMessage('');
                setButtonActive(false);
                socket.emit('sendMessage', { ...response.data.data, to: recipientUser.id });
            })
            .catch((error) => {
                handleError(error);
            });
    };

    return (
        <Stack direction="column" position="relative" height="100%">
            <Stack direction="column" gap={0.5} sx={{ overflowY: 'scroll', flex: 1 }} padding={2} ref={chatRoomRef}>
                {messages &&
                    messages.map((message, index) => (
                        <Message own={message.from === currentUser.id} data={message} key={index} />
                    ))}
            </Stack>

            <Input
                size="sm"
                placeholder="Nhập nội dung tin nhắn..."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handlePress}
                sx={{ marginLeft: 1.5, marginRight: 2 }}
                endDecorator={
                    <IconJoy onClick={handleSendMessage} variant="plain" disabled={!isButtonActive}>
                        <SendIcon sx={{ color: isButtonActive ? '#096BDE' : '#ccc' }} />
                    </IconJoy>
                }
                startDecorator={
                    <IconButton size="small" sx={{ padding: 0 }} onClick={handleAddCircleClick} ref={chatRoomRef}>
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                }
            />
            {showPaper && (
                <Paper
                    ref={paperRef}
                    elevation={0}
                    onClose={handleClosePaper}
                    sx={{ position: 'absolute', bottom: '28px', width: '100%', padding: 0 }}
                >
                    <Stack direction="row" sx={{ margin: 1 }}>
                        <Tooltip title="Stickers" placement="top" arrow>
                            <IconButton size="small" onClick={() => setShowPicker((val) => !val)}>
                                <TagFacesIcon fontSize="inherit" />
                                <div style={{ position: 'absolute', bottom: 25 }} onClick={(e) => e.stopPropagation()}>
                                    {showPicker && (
                                        <EmojiPicker emojiStyle={EmojiStyle.NATIVE} onEmojiClick={handleEmojiClick} />
                                    )}
                                </div>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Hình ảnh" placement="top" arrow>
                            <IconButton size="small">
                                <ImageIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Video" placement="top" arrow>
                            <IconButton size="small">
                                <SlideshowIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}

export default ChatRoom;

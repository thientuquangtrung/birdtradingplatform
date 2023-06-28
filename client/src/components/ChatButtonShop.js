import { Button as JoyButton } from '@mui/joy';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

function ChatButtonShop({ shopId }) {
    const { currentUser } = useContext(AuthContext);
    const { createChat, setIsChatOpen, userChats } = useContext(ChatContext);

    const handleClick = () => {
        const isExist = userChats.some((chat) => chat.member.includes(shopId));
        if (!isExist) createChat(currentUser.id, shopId);
        setIsChatOpen(true);
    };

    return (
        <JoyButton
            sx={{ padding: '1px 6px', backgroundColor: '' }}
            color="neutral"
            size="sm"
            variant="outlined"
            startDecorator={<QuestionAnswerIcon fontSize="small" />}
            onClick={handleClick}
        >
            Chat Ngay
        </JoyButton>
    );
}

export default ChatButtonShop;

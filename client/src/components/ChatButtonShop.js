import { Button as JoyButton } from '@mui/joy';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';

function ChatButtonShop() {
    return (
        <JoyButton
        
        sx={{padding: '1px 6px', backgroundColor: ''}}
            color="neutral"
            size="sm"
            variant="outlined"
            component={Link}
            // to={`/shop/${product.shop?.name}`}
            startDecorator={<QuestionAnswerIcon fontSize="small" />}
        >
            Chat Ngay
        </JoyButton>
    );
}

export default ChatButtonShop;

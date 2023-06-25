import { Button as JoyButton } from '@mui/joy';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';
import axiosClient from '../api/axiosClient';

function ChatButtonShop({ shopId }) {
    const { currentUser } = useContext(AuthContext);

    axiosClient
        .post(`chat`, {
            firstId: currentUser.id,
            secondId: shopId,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <JoyButton
            sx={{ padding: '1px 6px', backgroundColor: '' }}
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

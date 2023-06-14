import { Button } from '@mui/material';
import axiosClient from '../api/axiosClient';

function MomoButton() {
    const handlePayment = () => {
        axiosClient
            .post('create_momo_payment')
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    return <Button onClick={handlePayment}>MOMO payment</Button>;
}

export default MomoButton;

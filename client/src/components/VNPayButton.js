import { Button } from '@mui/material';
import axiosClient from '../api/axiosClient';

function VNPayButton() {
    const handlePay = () => {
        axiosClient
            .post('create_vnp_payment_url', {
                amount: 10000,
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    return <Button onClick={handlePay}>VNPAY</Button>;
}

export default VNPayButton;

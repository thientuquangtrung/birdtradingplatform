import Button from '@mui/joy/Button';
import { Typography } from '@mui/material';
import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';

function MoMoButton({ ordersData }) {
    const handlePayment = () => {
        axiosClient
            .post('create_momo_payment', ordersData)
            .then((response) => console.log(response))
            .catch((error) => handleError(error));
    };
    return (
        <Button onClick={handlePayment} color="danger" variant="soft" sx={{ width: '280px' }}>
            <img width={50} height={50} src="https://warburgpincus.com/wp-content/uploads/2018/10/MoMo_logo-1.png" />
            <Typography variant="h6" fontSize={16} color="#cb278b">
                Thanh toán bằng Ví MoMo
            </Typography>
        </Button>
    );
}

export default MoMoButton;

import Button from '@mui/joy/Button';
import axiosClient from '../api/axiosClient';
import handleError from '../utils/handleError';

function VNPayButton({ ordersData }) {
    const handlePay = () => {
        axiosClient
            .post('create_vnp_payment_url', ordersData)
            .then((response) => console.log(response))
            .catch((error) => handleError(error));
    };

    return (
        <Button variant="soft" onClick={handlePay} sx={{ width: '280px', height: '50px' }}>
            <img width={80} height={15} src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png" />
        </Button>
    );
}

export default VNPayButton;

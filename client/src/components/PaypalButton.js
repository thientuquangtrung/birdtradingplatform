import { PayPalButtons } from '@paypal/react-paypal-js';
import axiosClient from '../api/axiosClient';

function PaypalButton({ ordersData }) {
    const createOrder = async (data) => {
        // Order is created on the server and the order id is returned
        return await axiosClient
            .post('create-paypal-order', ordersData)
            .then((response) => {
                return response.data.id;
            })
            .catch((error) => console.log(error));
    };

    const onApprove = async (data) => {
        // Order is captured on the server and the response is returned to the browser
        return axiosClient
            .post('capture-paypal-order', {
                orderID: data.orderID,
            })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };
    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );
}

export default PaypalButton;

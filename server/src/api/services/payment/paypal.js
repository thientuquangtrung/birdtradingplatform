const fetch = require('node-fetch');
const { checkoutReview, placeOrder } = require('../checkout');
const CC = require('currency-converter-lt');

const { CLIENT_ID, APP_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';

async function createOrder({ userId, shopOrderIds }) {
    const { checkoutOrder } = await checkoutReview({ userId, shopOrderIds });

    const totalPrice = checkoutOrder.totalPrice;
    const currencyConverter = new CC({ from: 'VND', to: 'USD', amount: totalPrice });
    const dollarPrice = (await currencyConverter.convert()).toFixed(2);

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: dollarPrice.toString(),
                    },
                },
            ],
        }),
    });

    return handleResponse(response);
}

async function capturePayment({ orderID, userId, shopOrderIds }) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 200 || response.status === 201) {
        // set orders to db
        const result = await placeOrder({ shopOrderIds, userId, payment: 'PAYPAL', transactionId: orderID });
    }

    return handleResponse(response);
}

async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64');
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'post',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    const jsonData = await handleResponse(response);
    return jsonData.access_token;
}

async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

module.exports = {
    createOrder,
    capturePayment,
};

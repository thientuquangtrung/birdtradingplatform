const createError = require('http-errors');
const paypal = require('../services/payment/paypal');

const createPaypalOrder = async (req, res, next) => {
    try {
        const order = await paypal.createOrder(req.body);
        return res.json(order);
    } catch (error) {
        next(error);
    }
};

const capturePaypalOrder = async (req, res, next) => {
    try {
        const { orderID } = req.body;
        const captureData = await paypal.capturePayment(orderID);
        return res.json(captureData);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPaypalOrder,
    capturePaypalOrder,
};

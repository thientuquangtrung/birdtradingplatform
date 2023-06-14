const createHttpError = require('http-errors');
const orderData = require('../services/order');

const getOrdersByCusId = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id !== req.payload.id) next(createHttpError.Unauthorized('Invalid id'));

        const result = await orderData.getOrdersByCusId({ id, ...req.query });

        return res.send({
            status: 200,
            message: 'OK',
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

const getOrdersByShop = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id !== req.payload.id) next(createHttpError.Unauthorized('Invalid id'));

        const result = await orderData.getOrdersByShop({ id, ...req.query });

        return res.send({
            status: 200,
            message: 'OK',
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

const cancelOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) return createHttpError.BadRequest('Invalid request');
        const status = req.query.status ? req.query.status : 'PENDING';
        const data = await orderData.changeOrderStatus({ orderId, status });

        return res.send({
            status: 200,
            message: 'OK',
            data,
        });
    } catch (error) {
        next(error);
    }
};
const changeOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) return createHttpError.BadRequest('Invalid request');
        const status = req.body.status ? req.body.status : 'PENDING';
        const data = await orderData.changeOrderStatus({ orderId, status });

        return res.send({
            status: 200,
            message: 'OK',
            data,
        });
    } catch (error) {
        next(error);
    }
};
const getRevenue = async (req, res, next) => {
    try {
        const data = await orderData.getRevenue({ ...req.query, id: req.params.id });

        return res.send({
            status: 200,
            message: 'OK',
            data,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrdersByCusId,
    changeOrderStatus,
    cancelOrder,
    getOrdersByShop,
    getRevenue,
};

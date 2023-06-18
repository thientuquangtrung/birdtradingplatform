const createError = require('http-errors');
const crypto = require('crypto');
const paypal = require('../services/payment/paypal');
const vnpay = require('../services/payment/vnpay');
const momo = require('../services/payment/momo');

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
        const captureData = await paypal.capturePayment(req.body);
        return res.json(captureData);
    } catch (error) {
        next(error);
    }
};

const createVNPayUrl = async (req, res, next) => {
    try {
        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        const vnpUrl = await vnpay.createVNPayUrl({ ...req.body, ipAddr });
        return res.send({
            status: 200,
            redirect_url: vnpUrl,
        });
    } catch (error) {
        next(error);
    }
};

const getVNPayTransactionResult = async (req, res, next) => {
    try {
        var vnp_Params = req.query;
        const result = await vnpay.getVNPayTransactionResult({ vnp_Params });

        if (result) {
            return res.status(200).json({ RspCode: '00', Message: 'success' });
        } else {
            return res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
        }
    } catch (error) {
        next(error);
    }
};

const getVNPayReturn = async (req, res, next) => {
    try {
        var vnp_Params = req.query;
        const result = await vnpay.getVNPayReturn({ vnp_Params, ...req.body });

        if (result) {
            return res.send({
                status: 200,
                message: 'OK',
            });
        } else {
            return next(createError.BadRequest('Failed checksum'));
        }
    } catch (error) {
        next(error);
    }
};

const createMomoPayUrl = async (req, res, next) => {
    try {
        const result = await momo.createMomoPayUrl(req.body);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPaypalOrder,
    capturePaypalOrder,
    createVNPayUrl,
    createMomoPayUrl,
    getVNPayTransactionResult,
    getVNPayReturn,
};

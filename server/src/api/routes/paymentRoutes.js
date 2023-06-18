const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const {
    createPaypalOrder,
    capturePaypalOrder,
    createVNPayUrl,
    createMomoPayUrl,
    getVNPayTransactionResult,
    getVNPayReturn
} = require('../controllers/paymentController');

router.post('/create-paypal-order', verifyAccessToken, createPaypalOrder);
router.post('/capture-paypal-order', verifyAccessToken, capturePaypalOrder);

router.post('/create_vnp_payment_url', verifyAccessToken, createVNPayUrl);
router.get('/vnpay_ipn', getVNPayTransactionResult);
router.post('/vnpay_return', getVNPayReturn);

router.post('/create_momo_payment', verifyAccessToken, createMomoPayUrl);

module.exports = {
    routes: router,
};

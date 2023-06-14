const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createPaypalOrder, capturePaypalOrder, createVNPayUrl, createMomoPayUrl } = require('../controllers/paymentController');

router.post('/create-paypal-order', verifyAccessToken, createPaypalOrder);
router.post('/capture-paypal-order', verifyAccessToken, capturePaypalOrder);

router.post('/create_vnp_payment_url', verifyAccessToken, createVNPayUrl);

router.post('/create_momo_payment', verifyAccessToken, createMomoPayUrl);

module.exports = {
    routes: router,
};

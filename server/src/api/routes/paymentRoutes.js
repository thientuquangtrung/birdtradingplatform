const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createPaypalOrder, capturePaypalOrder, createVNPayUrl } = require('../controllers/paymentController');

router.post('/create-paypal-order', verifyAccessToken, createPaypalOrder);
router.post('/capture-paypal-order', verifyAccessToken, capturePaypalOrder);

router.post('/create_vnp_payment_url', verifyAccessToken, createVNPayUrl);

module.exports = {
    routes: router,
};

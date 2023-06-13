const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createPaypalOrder, capturePaypalOrder } = require('../controllers/paymentController');

router.post('/create-paypal-order', verifyAccessToken, createPaypalOrder);
router.post('/capture-paypal-order', verifyAccessToken, capturePaypalOrder);

module.exports = {
    routes: router,
};

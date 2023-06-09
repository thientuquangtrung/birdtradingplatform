const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { checkoutReview, placeOrder } = require('../controllers/checkoutController');

router.post('/checkout', verifyAccessToken, checkoutReview);
router.post('/place_order', verifyAccessToken, placeOrder);

module.exports = {
    routes: router,
};

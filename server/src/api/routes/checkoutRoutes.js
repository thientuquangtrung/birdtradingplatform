const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { checkoutReview } = require('../controllers/checkoutController');

router.post('/checkout', verifyAccessToken, checkoutReview);

module.exports = {
    routes: router,
};

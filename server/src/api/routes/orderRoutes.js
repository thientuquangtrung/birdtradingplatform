const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getOrdersByCusId, cancelOrder, getOrdersByShop } = require('../controllers/orderController');

router.get('/customer/order/:id', verifyAccessToken, getOrdersByCusId);
router.get('/seller/order/:id', verifyAccessToken, getOrdersByShop);
router.delete('/order/cancel/:orderId', verifyAccessToken, cancelOrder);

module.exports = {
    routes: router,
};

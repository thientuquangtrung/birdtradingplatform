const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getOrdersByCusId, cancelOrder, getOrdersByShop, getRevenue } = require('../controllers/orderController');

router.get('/customer/order/:id', verifyAccessToken, getOrdersByCusId);
router.get('/seller/order/:id', verifyAccessToken, getOrdersByShop);
router.get('/seller/revenue/:id', verifyAccessToken, getRevenue);
router.delete('/order/cancel/:orderId', verifyAccessToken, cancelOrder);

module.exports = {
    routes: router,
};

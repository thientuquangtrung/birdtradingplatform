const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const {
    getOrdersByCusId,
    cancelOrder,
    getOrdersByShop,
    changeOrderStatus,
    getRevenue,
} = require('../controllers/orderController');

router.get('/customer/order/:id', verifyAccessToken, getOrdersByCusId);
router.get('/seller/order/:id', verifyAccessToken, getOrdersByShop);
router.get('/seller/revenue/:id', verifyAccessToken, getRevenue);
router.delete('/order/cancel/:orderId', verifyAccessToken, cancelOrder);
router.put('/order/change_status/:orderId', verifyAccessToken, changeOrderStatus);

module.exports = {
    routes: router,
};

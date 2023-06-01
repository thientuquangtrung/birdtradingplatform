const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { addToCart, deleteCartItem, deleteCart, updateCart, getUserCart } = require('../controllers/cartController');

router.get('/cart', verifyAccessToken, getUserCart);
router.post('/cart', verifyAccessToken, addToCart);
router.put('/cart', verifyAccessToken, updateCart);
router.delete('/cart', verifyAccessToken, deleteCart);
router.delete('/cart/item', verifyAccessToken, deleteCartItem);

module.exports = {
    routes: router,
};

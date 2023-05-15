const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

const { getProducts, getProductById, createProduct } = productController;

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', createProduct)

module.exports = {
    routes: router
}
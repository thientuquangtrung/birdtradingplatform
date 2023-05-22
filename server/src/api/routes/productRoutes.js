const express = require('express');
const productController = require('../controllers/productController');
const { uploadImg } = require("../middlewares/uploadFile");

const router = express.Router();

const { getProducts, getProductById, getProductsOfSeller, createProduct } = productController;

const { verifyAccessToken } = require('../utils/jwt_utils')

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.get('/seller/product', verifyAccessToken, getProductsOfSeller);
router.post('/seller/product', verifyAccessToken, uploadImg('product').single('image'), createProduct)

module.exports = {
    routes: router
}
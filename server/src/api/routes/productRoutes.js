const express = require('express');
const productController = require('../controllers/productController');
const { uploadImg } = require('../middlewares/uploadFile');

const router = express.Router();

const {
    getProducts,
    getProductById,
    getProductsOfSeller,
    createProduct,
    searchSellerProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductByCategory,
    filterProducts
} = productController;

const { verifyAccessToken } = require('../utils/jwt_utils');

router.get('/product', getProducts);
router.get('/product/search', searchProducts);
router.get('/product/filter', filterProducts);
router.get('/product/category/:id', getProductByCategory);
router.get('/product/:id', getProductById);

router.get('/seller/product', verifyAccessToken, getProductsOfSeller);
router.get('/seller/product/search', verifyAccessToken, searchSellerProducts);
router.post('/seller/product', verifyAccessToken, uploadImg('product').single('image'), createProduct);
router.patch('/seller/product', verifyAccessToken, uploadImg('product').single('image'), updateProduct);
router.delete('/seller/product', verifyAccessToken, deleteProduct);

module.exports = {
    routes: router,
};

const express = require('express');
const authController = require('../controllers/authController');
const { checkMail } = require('../middlewares/checkMail');
const { uploadImg } = require('../middlewares/uploadFile');

const router = express.Router();

const { verifyAccessToken, verifyRefreshToken } = require('../utils/jwt_utils');

const {
    createSellerAccount,
    sellerLogin,
    updateSeller,
    getCurrentUser,
    getNewAccessToken,
    customerLogin,
    createCustomerAccount,
    updateCustomer,
    adminLogin,
} = authController;

router.get('/refresh_token', verifyRefreshToken, getNewAccessToken);
router.get('/auth/me', verifyAccessToken, getCurrentUser);
router.post('/auth/seller/register', checkMail, createSellerAccount);
router.post('/auth/seller/login', sellerLogin);
router.patch('/auth/seller/me', verifyAccessToken, uploadImg('profile').single('profile'), updateSeller);
router.post('/auth/customer/login', customerLogin);
router.post('/auth/customer/register', checkMail, createCustomerAccount);
router.patch('/auth/customer/me', verifyAccessToken, uploadImg('profile').single('profile'), updateCustomer);
router.post('/auth/admin/login', adminLogin);

module.exports = {
    routes: router,
};

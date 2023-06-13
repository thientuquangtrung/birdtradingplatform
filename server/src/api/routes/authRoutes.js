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
    getAccounts,
    updateAccountByAdmin,
    deleteAccount,
    createNewAccount,
    getAccountById
} = authController;

router.get('/refresh_token', verifyRefreshToken, getNewAccessToken);
router.get('/auth/me', verifyAccessToken, getCurrentUser);
router.get('/auth/account', verifyAccessToken, getAccounts);
router.get('/auth/account/:id', verifyAccessToken, getAccountById);
router.post('/auth/seller/register', checkMail, createSellerAccount);
router.post('/auth/seller/login', sellerLogin);
router.patch('/auth/seller/me', verifyAccessToken, uploadImg('profile').single('profile'), updateSeller);
router.post('/auth/customer/login', customerLogin);
router.post('/auth/customer/register', checkMail, createCustomerAccount);
router.patch('/auth/customer/me', verifyAccessToken, uploadImg('profile').single('profile'), updateCustomer);
router.post('/auth/admin/login', adminLogin);
router.patch('/auth/account', verifyAccessToken, updateAccountByAdmin);
router.delete('/auth/account/:id', verifyAccessToken, deleteAccount);
router.post('/auth/account', verifyAccessToken, uploadImg('profile').single('profile'), createNewAccount);

module.exports = {
    routes: router,
};

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { checkExistingMail } = require('../middlewares/checkExistingMail');
const { checkValidMail } = require('../middlewares/checkValidMail');
const { uploadImg } = require('../middlewares/uploadFile');
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
    getAccountById,
    changePassword,
    sendResetLinkMail,
    resetPassword,
} = authController;

router.get('/refresh_token', verifyRefreshToken, getNewAccessToken);
router.get('/auth/me', verifyAccessToken, getCurrentUser);
router.get('/auth/account', verifyAccessToken, getAccounts);
router.get('/auth/account/:id', verifyAccessToken, getAccountById);

router.post('/auth/seller/login', sellerLogin);
router.post('/auth/customer/login', customerLogin);
router.post('/auth/admin/login', adminLogin);
router.post('/auth/seller/register', checkValidMail, checkExistingMail, createSellerAccount);
router.post('/auth/customer/register', checkValidMail, checkExistingMail, createCustomerAccount);
router.post('/auth/account', verifyAccessToken, uploadImg('profile').single('profile'), createNewAccount);
router.post('password/email', checkValidMail, checkExistingMail, sendResetLinkMail);

router.patch('/auth/seller/me', verifyAccessToken, uploadImg('profile').single('profile'), updateSeller);
router.patch('/auth/customer/me', verifyAccessToken, uploadImg('profile').single('profile'), updateCustomer);
router.patch('/auth/account', verifyAccessToken, updateAccountByAdmin);
router.put('/auth/password', verifyAccessToken, changePassword);
router.put('password/reset', resetPassword);

router.delete('/auth/account/:id', verifyAccessToken, deleteAccount);

module.exports = {
    routes: router,
};

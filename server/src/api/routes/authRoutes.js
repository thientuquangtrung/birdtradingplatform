const express = require('express');
const authController = require('../controllers/authController');
const { checkMail } = require('../middlewares/checkMail');
const { uploadImg } = require('../middlewares/uploadFile');

const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createSellerAccount, sellerLogin, updateSeller, getCurrentUser } = authController;

router.get('/auth/me', verifyAccessToken, getCurrentUser);
router.post('/auth/seller/register', checkMail, createSellerAccount);
router.post('/auth/seller/login', sellerLogin);
router.patch('/auth/seller/me', verifyAccessToken, uploadImg('profile').single('profile'), updateSeller);

module.exports = {
    routes: router,
};

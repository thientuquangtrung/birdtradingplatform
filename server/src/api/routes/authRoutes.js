const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

const { checkMail, createSellerAccount } = authController;

router.post('/auth/verify_mail', checkMail)
router.post('/auth/seller', createSellerAccount)

module.exports = {
    routes: router
}
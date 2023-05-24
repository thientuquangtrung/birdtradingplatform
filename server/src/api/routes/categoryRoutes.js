const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getCategories } = require('../controllers/categoryController');

router.get('/category', getCategories);

module.exports = {
    routes: router,
};

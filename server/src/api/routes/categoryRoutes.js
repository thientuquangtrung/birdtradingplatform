const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/category', getCategories);
router.post('/category', verifyAccessToken, createCategory);
router.put('/category/:id', verifyAccessToken, updateCategory);
router.delete('/category/:id', verifyAccessToken, deleteCategory);

module.exports = {
    routes: router,
};

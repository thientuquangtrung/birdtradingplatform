const express = require('express');
const router = express.Router();
const { uploadImg } = require('../middlewares/uploadFile');

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getFeedbackOfProduct, createFeedback } = require('../controllers/feedbackController');

router.get('/feedback/:productId', getFeedbackOfProduct);
router.post('/feedback', verifyAccessToken, uploadImg().single('image'), createFeedback);

module.exports = {
    routes: router,
};

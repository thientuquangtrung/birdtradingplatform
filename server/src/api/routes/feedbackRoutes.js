const express = require('express');
const router = express.Router();
const { uploadImg } = require('../middlewares/uploadFile');

const { verifyAccessToken } = require('../utils/jwt_utils');

const { getFeedbackOfProduct, createFeedback } = require('../controllers/feedbackController');

router.get('/feedback/:productId', verifyAccessToken, getFeedbackOfProduct);
router.post('/feedback', verifyAccessToken, uploadImg('feedback').single('image'), createFeedback);

module.exports = {
    routes: router,
};

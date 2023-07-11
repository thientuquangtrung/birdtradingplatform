const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createNotification, getAllNotification } = require('../controllers/notificationController');

router.get('/notification/:userId', verifyAccessToken, getAllNotification);
router.post('/notification', verifyAccessToken, createNotification);

module.exports = {
    routes: router,
};

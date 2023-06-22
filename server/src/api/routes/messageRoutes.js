const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createMessage, getAllMessages } = require('../controllers/messageController');

router.get('/message/:chatId', verifyAccessToken, getAllMessages);
router.post('/message', verifyAccessToken, createMessage);

module.exports = {
    routes: router,
};

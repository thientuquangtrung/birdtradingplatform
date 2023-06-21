const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../utils/jwt_utils');

const { createChat, getOneChat, getUserChats } = require('../controllers/chatController');

router.get('/chat/:userId', verifyAccessToken, getUserChats);
router.get('/chat/:firstId/:secondId', verifyAccessToken, getOneChat);
router.post('/chat', verifyAccessToken, createChat);

module.exports = {
    routes: router,
};

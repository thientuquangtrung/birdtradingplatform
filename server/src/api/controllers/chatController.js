const chatData = require('../services/chat');

const createChat = async (req, res, next) => {
    try {
        // get 2 ids from req.body
        const { firstId, secondId } = req.body;
        const result = await chatData.createChat({ firstId, secondId });

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get all chat rooms of specific user
const getUserChats = async (req, res, next) => {
    try {
        // get userId from req.params
        const userChats = await chatData.getUserChats(req.params.userId);

        return res.send({
            status: 200,
            message: 'OK',
            data: userChats,
        });
    } catch (error) {
        next(error);
    }
};

const getOneChat = async (req, res, next) => {
    try {
        // get two ids from req.params '/:firstId/:secondId'
        const { firstId, secondId } = req.body;
        const result = await chatData.getOneChat({ firstId, secondId });

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createChat,
    getUserChats,
    getOneChat,
};

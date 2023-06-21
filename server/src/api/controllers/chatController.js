const createChat = async (req, res, next) => {
    try {
    } catch (error) {
        // get 2 ids from req.body
        // check if chat is already
        // create new chat
        next(error);
    }
};

// get all chat rooms of specific user
const getUserChats = async (req, res, next) => {
    try {
        // get userId from req.params
        // get all chat rooms containing userId
    } catch (error) {
        next(error);
    }
};

const getOneChat = async (req, res, next) => {
    try {
        // get two ids from req.params '/:firstId/:secondId'
        // get chat room containing both ids

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createChat,
    getUserChats,
    getOneChat
};

const createError = require('http-errors');
const categoryData = require('../services/category');

const getCategories = async (req, res, next) => {
    try {
        const list = await categoryData.getCategories();
        return res.send(list);
    } catch (error) {
        next(createError(error.message));
    }
};

module.exports = {
    getCategories,
};

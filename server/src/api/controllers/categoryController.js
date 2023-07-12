const createError = require('http-errors');
const categoryData = require('../services/category');

const getCategories = async (req, res, next) => {
    try {
        const list = await categoryData.getCategories();
        return res.send(list);
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const result = await categoryData.createCategory(req.body.name);
        return res.send({
            status: 200,
            message: 'OK',
            date: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await categoryData.updateCategory(id, name);
        return res.send({
            status: 200,
            message: 'OK',
            date: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await categoryData.deleteCategory(id);
        return res.send({
            status: 200,
            message: 'OK',
            date: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};

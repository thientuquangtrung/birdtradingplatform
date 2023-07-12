const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');

const getCategories = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('category');
        const list = await pool.request().query(sqlQueries.getCategories);

        return list.recordset;
    } catch (err) {
        throw createError(err);
    }
};

const createCategory = async (name) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('category');
        const list = await pool.request().input('name', sql.NVarChar, name).query(sqlQueries.createCategory);

        return list.recordset[0];
    } catch (err) {
        throw createError(err);
    }
};

const updateCategory = async (id, name) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('category');
        const list = await pool
            .request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .query(sqlQueries.updateCategory);

        return list.recordset[0];
    } catch (err) {
        throw createError(err);
    }
};

const deleteCategory = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('category');
        const list = await pool.request().input('id', sql.Int, id).query(sqlQueries.deleteCategory);

        return list.recordset[0];
    } catch (err) {
        throw createError(err);
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};

const sql = require('mssql');
const config = require('../../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');

const getCategories = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('category');
        const list = await pool.request().query(sqlQueries.getCategories);

        return list.recordset;
    } catch (err) {
        throw createError(error);
    }
};

module.exports = {
    getCategories,
};

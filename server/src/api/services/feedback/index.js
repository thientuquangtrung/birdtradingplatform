const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');
const { readAccountById } = require('../auth');

const createFeedback = async ({ orderId, content, image }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('feedback');
        const list = await pool
            .request()
            .input('orderId', sql.UniqueIdentifier, orderId)
            .input('content', sql.NVarChar, content)
            .input('image', sql.VarChar, image)
            .query(sqlQueries.createFeedback);

        return list.recordset;
    } catch (err) {
        throw createError(err);
    }
};

const getFeedbackOfProduct = async ({ productId }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('feedback');
        const list = await pool
            .request()
            .input('productId', sql.UniqueIdentifier, productId)
            .query(sqlQueries.getFeedBackOfProduct);

        for (const feedback of list.recordset) {
            feedback.customer = await readAccountById(feedback.customerId, 'CUSTOMER');
        }
        return list.recordset;
    } catch (err) {
        throw createError(err);
    }
};

module.exports = {
    createFeedback,
    getFeedbackOfProduct,
};

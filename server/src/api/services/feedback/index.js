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

const getFeedbackOfProduct = async ({ productId, page, perPage }) => {
    try {
        if (!page) page = 1;
        if (!perPage) perPage = 5;
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('feedback');
        const list = await pool
            .request()
            .input('productId', sql.UniqueIdentifier, productId)
            .input('page', sql.Int, Number(page))
            .input('perPage', sql.Int, Number(perPage))
            .query(sqlQueries.getFeedBackOfProduct);

        let total;
        for (const feedback of list.recordset) {
            total = feedback.total;
            delete feedback.total;
            feedback.image = `${process.env.HOST_URL}/feedback/${feedback.image}`;
            const customer = await readAccountById(feedback.customerId, 'CUSTOMER');
            customer.image = `${process.env.HOST_URL}/profile/${customer.image}`;
            feedback.customer = customer;
        }

        return {
            data: list.recordset,
            meta: {
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(Number(list.recordset?.length) / Number(perPage)),
            },
        };
    } catch (err) {
        throw createError(err);
    }
};

module.exports = {
    createFeedback,
    getFeedbackOfProduct,
};

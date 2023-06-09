const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');
const { modifyOrder } = require('../../utils/response_modifiers');

const getOrdersByCusId = async ({ id, status }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('status', sql.VarChar, status)
            .query(sqlQueries.getOrdersByCusId);

        const response = await modifyOrder(list.recordset);
        return response;
    } catch (err) {
        throw createError(err);
    }
};

const getOrdersByShop = async ({ id, status }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('status', sql.VarChar, status)
            .query(sqlQueries.getOrdersByShop);

        const response = await modifyOrder(list.recordset);
        return response;
    } catch (err) {
        throw createError(err);
    }
};

const changeOrderStatus = async ({ orderId, status }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('orderId', sql.UniqueIdentifier, orderId)
            .input('status', sql.VarChar, status)
            .query(sqlQueries.changeOrderStatus);

        return list.recordset;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getOrdersByCusId,
    changeOrderStatus,
    getOrdersByShop,
};

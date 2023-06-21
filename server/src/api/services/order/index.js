const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');
const { modifyOrder } = require('../../utils/response_modifiers');

const getOrdersByCusId = async ({ id, status, page, perPage }) => {
    try {
        if (!status) status = 'ALL';

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('status', sql.VarChar, status)
            .input('page', sql.Int, Number(page))
            .input('perPage', sql.Int, Number(perPage))
            .query(sqlQueries.getOrdersByCusId);

        let total = 0;
        if (list.recordset.length > 0) total = list.recordset[0].total;
        const result = await modifyOrder(list.recordset);
        return {
            data: result,
            meta: {
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(Number(total) / Number(perPage)),
            },
        };
    } catch (err) {
        throw createError(err);
    }
};

const getOrdersByShop = async ({ id, status, page, perPage }) => {
    try {
        if (!status) status = 'ALL';

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('status', sql.VarChar, status)
            .input('page', sql.Int, Number(page))
            .input('perPage', sql.Int, Number(perPage))
            .query(sqlQueries.getOrdersByShop);

        let total = 0;
        if (list.recordset.length > 0) total = list.recordset[0].total;
        const result = await modifyOrder(list.recordset);
        return {
            data: result,
            meta: {
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(Number(total) / Number(perPage)),
            },
        };
    } catch (err) {
        throw createError(err);
    }
};

const changeOrderStatus = async ({ orderId, status, cancelId = 0 }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('orderId', sql.UniqueIdentifier, orderId)
            .input('status', sql.VarChar, status)
            .input('cancelId', sql.Int, cancelId)
            .query(sqlQueries.changeOrderStatus);

        return list.recordset;
    } catch (error) {
        throw error;
    }
};

const getRevenue = async ({ startDate, endDate, id }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('order');
        const list = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('startDate', sql.VarChar, startDate)
            .input('endDate', sql.VarChar, endDate)
            .query(sqlQueries.getRevenue);

        return list.recordset;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getOrdersByCusId,
    changeOrderStatus,
    getOrdersByShop,
    getRevenue,
};

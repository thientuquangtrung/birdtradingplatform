const createError = require('http-errors');
const sql = require('mssql');
const config = require('../../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');

// get current user

const getCurrentUser = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const currentUser = await pool.request().input('id', sql.UniqueIdentifier, id).query(sqlQueries.getCurrentUser);

        return currentUser.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

// CRUD sellers

const createSellerAccount = async ({ name, phone, email, pickUpAddress, password }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const createdAccount = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('phone', sql.VarChar, phone)
            .input('email', sql.VarChar, email)
            .input('pickUpAddress', sql.NVarChar, pickUpAddress)
            .input('password', sql.Char, password)
            .query(sqlQueries.createSellerAccount);

        return createdAccount.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const readOneSeller = async (email) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const seller = await pool.request().input('email', sql.VarChar, email).query(sqlQueries.readOneSeller);

        return seller.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const readSellerById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const seller = await pool.request().input('id', sql.UniqueIdentifier, id).query(sqlQueries.readSellerById);

        return seller.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const updateSeller = async (data) => {
    try {
        const { name, email, password, phone, pickUpAddress, id, image, description } = data;

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const seller = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.Char, password)
            .input('image', sql.Char, image)
            .input('phone', sql.VarChar, phone)
            .input('pickUpAddress', sql.NVarChar, pickUpAddress)
            .input('description', sql.NVarChar, description)
            .input('id', sql.UniqueIdentifier, id)
            .query(sqlQueries.updateSeller);

        return seller.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

// helper methods

const checkMail = async ({ email }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const count = await pool.request().input('email', sql.VarChar, email).query(sqlQueries.checkMail);

        return count.recordset[0].count === 0;
    } catch (error) {
        throw createError(error);
    }
};

module.exports = {
    checkMail,
    createSellerAccount,
    readOneSeller,
    readSellerById,
    updateSeller,
    getCurrentUser,
};

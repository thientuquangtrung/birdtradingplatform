const createError = require('http-errors');
const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const { compareHashing, hashing } = require('../../utils/hash_utils');

const getAccounts = async ({ name, role }) => {
    try {
        if (!name) name = '';
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const currentUser = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('role', sql.VarChar, role)
            .query(sqlQueries.getAccounts);

        return currentUser.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const getAccountById = async ({ id, role }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('role', sql.VarChar, role)
            .query(sqlQueries.readAccountById);

        return account.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

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

const readOneAccount = async (email, role) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool
            .request()
            .input('email', sql.VarChar, email)
            .input('role', sql.VarChar, role)
            .query(sqlQueries.readOneAccount);

        return account.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const readAccountById = async (id, role) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('role', sql.VarChar, role)
            .query(sqlQueries.readAccountById);

        return account.recordset[0];
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
            .input('image', sql.VarChar, image)
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

const createCustomerAccount = async ({ name, phone, email, shipToAddress, password }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const createdAccount = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('phone', sql.VarChar, phone)
            .input('email', sql.VarChar, email)
            .input('shipToAddress', sql.NVarChar, shipToAddress)
            .input('password', sql.Char, password)
            .query(sqlQueries.createCustomerAccount);
        return createdAccount.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

// helper methods

const checkExistingMail = async ({ email }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const count = await pool.request().input('email', sql.VarChar, email).query(sqlQueries.checkExistingMail);

        return count.recordset[0].count === 0;
    } catch (error) {
        throw createError(error);
    }
};

const updateCustomer = async (data) => {
    try {
        const { name, email, password, phone, shipToAddress, id, image } = data;
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const seller = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.Char, password)
            .input('image', sql.VarChar, image)
            .input('phone', sql.VarChar, phone)
            .input('shipToAddress', sql.NVarChar, shipToAddress)
            .input('id', sql.UniqueIdentifier, id)
            .query(sqlQueries.updateCustomer);

        return seller.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const updateAccountByAdmin = async (data) => {
    try {
        const { name, email, phone, address, id, role } = data;

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.VarChar, email)
            .input('phone', sql.VarChar, phone)
            .input('role', sql.VarChar, role)
            .input('address', sql.NVarChar, address)
            .input('id', sql.UniqueIdentifier, id)
            .query(sqlQueries.updateAccountByAdmin);

        return account.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const deleteAccount = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool.request().input('id', sql.UniqueIdentifier, id).query(sqlQueries.deleteAccount);

        return account.recordset;
    } catch (error) {
        throw error;
    }
};

const createNewAccount = async ({ name, email, image, phone, password, address, role }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        const account = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.Char, password)
            .input('image', sql.VarChar, image)
            .input('phone', sql.VarChar, phone)
            .input('address', sql.NVarChar, address)
            .input('role', sql.VarChar, role)
            .query(sqlQueries.createNewAccount);
        return 'OK';
    } catch (error) {
        throw error;
    }
};

const changePassword = async ({ id, oldPassword, newPassword, confirmPassword }) => {
    try {
        if (newPassword !== confirmPassword) throw createError[400]('Confirm password does not match the new password');

        const account = await readAccountById(id, 'ALL');
        if (!account) throw createError.BadRequest('Account not found');
        const isValid = await compareHashing(account.password, oldPassword);
        if (!isValid) throw createError.BadRequest('Incorrect password');

        const newHashPassword = await hashing(newPassword);
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('auth');
        await pool
            .request()
            .input('id', sql.UniqueIdentifier, id)
            .input('password', sql.Char, newHashPassword)
            .query(sqlQueries.changePassword);
        return 'OK';
    } catch (error) {
        throw error;
    }
};

module.exports = {
    checkExistingMail,
    createSellerAccount,
    readOneAccount,
    readAccountById,
    updateSeller,
    getCurrentUser,
    createCustomerAccount,
    updateCustomer,
    getAccounts,
    updateAccountByAdmin,
    deleteAccount,
    createNewAccount,
    getAccountById,
    changePassword,
};

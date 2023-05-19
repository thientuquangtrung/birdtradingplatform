const sql = require('mssql');
const config = require('../../../config');
const utils = require('../../utils');

const createSellerAccount = async ({name, phone, email, address}) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('auth')
        const createdAccount = await pool.request()
                                        .input('name', sql.VarChar, name)
                                        .input('phone', sql.VarChar, phone)
                                        .input('email', sql.VarChar, email)
                                        .input('address', sql.VarChar, address)
                                        .query(sqlQueries.createSellerAccount)
        return createdAccount.recordset[0]
    } catch (error) {
        return  error.message
    }
}

const checkMail = async ({  email }) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('auth')
        const count = await pool.request()
                                        .input('email', sql.VarChar, email)
                                        .query(sqlQueries.checkMail)

        return count.recordset[0].count === 0
    } catch (error) {
        return  error.message
    }
}

module.exports = {
    checkMail,
    createSellerAccount
}
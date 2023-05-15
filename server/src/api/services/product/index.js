const sql = require('mssql');
const config = require('../../../config');
const utils = require('../../utils');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const list = await pool.request().query(sqlQueries.productList)

        return list.recordset
    }
    catch(err) {
        return err.message
    }
}

const getProductById = async (id) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const oneProduct = await pool.request()
                                        .input('id', sql.Int, id)
                                        .query(sqlQueries.productById)

        return oneProduct.recordset
    } catch (error) {
        return error.message
    }
}

const createProduct = async ({pName, description, price, discount, categoryId}) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await utils.loadSqlQueries('product')
        const createP = await pool.request()
                                        .input('name', sql.NVarChar, pName)
                                        .input('description', sql.NVarChar, description)
                                        .input('price', sql.Float, price)
                                        .input('discount', sql.Float, discount)
                                        .input('categoryId', sql.Int, categoryId)
                                        .query(sqlQueries.createProduct)

        return createP.recordset
    } catch (error) {
        return  error.message
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct
}


const sql = require('mssql');
const config = require('../../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await loadSqlQueries('product')
        const list = await pool.request().query(sqlQueries.productList)

        return list.recordset
    }
    catch(err) {
        throw createError(error)
    }
}

const getProductById = async (id) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await loadSqlQueries('product')
        const oneProduct = await pool.request()
                                        .input('id', sql.Int, id)
                                        .query(sqlQueries.productById)

        return oneProduct.recordset[0]
    } catch (error) {
        throw createError(error)
    }
}

const getProductsOfSeller = async (shopId) => {
    try {
        let pool = await sql.connect(config.sql)
        const sqlQueries = await loadSqlQueries('product')
        const list = await pool.request()
                                        .input('shopId', sql.UniqueIdentifier, shopId)
                                        .query(sqlQueries.productsOfSeller)

        return list.recordset
    } catch (error) {
        throw createError(error)
    }
}
const createProduct = async ({name, shopId, description, price, image, categoryId}) => {
    try {
        
        let pool = await sql.connect(config.sql)
        const sqlQueries = await loadSqlQueries('product')
        const createP = await pool.request()
                                        .input('name', sql.NVarChar, name)
                                        .input('shopId', sql.UniqueIdentifier, shopId)
                                        .input('description', sql.NVarChar, description)
                                        .input('price', sql.Float, price)
                                        .input('image', sql.VarChar, image)
                                        .input('categoryId', sql.Int, categoryId)
                                        .query(sqlQueries.createProduct)

        return createP.recordset[0]
    } catch (error) {
        throw createError(error)
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductsOfSeller,
    createProduct
}


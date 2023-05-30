const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const createError = require('http-errors');

const getProducts = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool.request().query(sqlQueries.productList);

        return list.recordset;
    } catch (err) {
        throw createError(error);
    }
};

const getProductById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const oneProduct = await pool.request().input('id', sql.Int, id).query(sqlQueries.productById);

        return oneProduct.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const getProductByCategory = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool.request().input('id', sql.Int, id).query(sqlQueries.getProductByCategory);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const searchProducts = async (q) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool.request().input('q', sql.NVarChar, q).query(sqlQueries.searchProducts);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const filterProducts = async (sortBy, order, categoryId) => {
    try {
        if (categoryId) {
            categoryId = '[categoryId] = ' + categoryId;
        } else {
            categoryId = ' 1=1 ';
        }

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('sortBy', sql.VarChar, sortBy)
            .input('order', sql.VarChar, order)
            .input('categoryId', sql.VarChar, categoryId)
            .query(sqlQueries.filterProducts);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const getProductsOfSeller = async (shopId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('shopId', sql.UniqueIdentifier, shopId)
            .query(sqlQueries.productsOfSeller);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const searchSellerProducts = async (shopId, q, categoryId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('shopId', sql.UniqueIdentifier, shopId)
            .input('q', sql.NVarChar, q)
            .input('categoryId', sql.VarChar, categoryId)
            .query(sqlQueries.searchSellerProducts);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const createProduct = async ({ name, shopId, description, price, image, categoryId }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const createP = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('shopId', sql.UniqueIdentifier, shopId)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Float, price)
            .input('image', sql.VarChar, image)
            .input('categoryId', sql.Int, categoryId)
            .query(sqlQueries.createProduct);

        return createP.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const updateProduct = async ({ id, name, shopId, description, price, image, categoryId }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const updated = await pool
            .request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .input('shopId', sql.UniqueIdentifier, shopId)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Float, price)
            .input('image', sql.VarChar, image)
            .input('categoryId', sql.Int, categoryId)
            .query(sqlQueries.updateProduct);

        return updated.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const deleteProduct = async (id, shopId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const deleted = await pool
            .request()
            .input('id', sql.Int, id)
            .input('shopId', sql.UniqueIdentifier, shopId)
            .query(sqlQueries.deleteProduct);

        return deleted.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsOfSeller,
    createProduct,
    searchSellerProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    getProductByCategory,
};

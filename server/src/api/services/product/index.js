const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const { pagination } = require('../../utils/pagination');
const createError = require('http-errors');

const getProducts = async (pageNo) => {
    try {
        const { page, rowsOfPage } = pagination(pageNo);

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('page', sql.Int, page)
            .input('rowsOfPage', sql.Int, rowsOfPage)
            .query(sqlQueries.productList);

        return list.recordset;
    } catch (err) {
        throw createError(error);
    }
};

const getProductById = async (id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const oneProduct = await pool.request().input('id', sql.UniqueIdentifier, id).query(sqlQueries.productById);

        return oneProduct.recordset[0];
    } catch (error) {
        throw createError(error);
    }
};

const getProductByCategory = async (id, pageNo) => {
    try {
        const { page, rowsOfPage } = pagination(pageNo);

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('id', sql.Int, id)
            .input('page', sql.Int, page)
            .input('rowsOfPage', sql.Int, rowsOfPage)
            .query(sqlQueries.getProductByCategory);
        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const searchProducts = async (q, pageNo) => {
    try {
        const { page, rowsOfPage } = pagination(pageNo);

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('q', sql.NVarChar, q)
            .input('page', sql.Int, page)
            .input('rowsOfPage', sql.Int, rowsOfPage)
            .query(sqlQueries.searchProducts);

        return list.recordset;
    } catch (error) {
        throw createError(error);
    }
};

const filterProducts = async (sortBy, order, categoryId, q, pageNo) => {
    try {
        if (categoryId !== '0' && categoryId) {
            categoryId = ' [categoryId] = ' + categoryId;
        } else {
            categoryId = ' 1=1 ';
        }

        if (q) {
            q = ` and [name] like '%${q}%' `;
        } else {
            q = ' and 1=1 ';
        }

        const { page, rowsOfPage } = pagination(pageNo);
        const offset = ((page - 1) * rowsOfPage).toString();

        console.table({ sortBy, order, offset, categoryId, q, rowsOfPage });
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = await pool
            .request()
            .input('sortBy', sql.VarChar, sortBy)
            .input('order', sql.VarChar, order)
            .input('categoryId', sql.VarChar, categoryId)
            .input('q', sql.VarChar, q)
            .input('offset', sql.VarChar, offset)
            .input('rowsOfPage', sql.VarChar, process.env.ROW_OF_PAGE)
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
            .input('id', sql.UniqueIdentifier, id)
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
            .input('id', sql.UniqueIdentifier, id)
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

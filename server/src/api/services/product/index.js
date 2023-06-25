const createError = require('http-errors');
const sql = require('mssql');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const { pagination } = require('../../utils/pagination');
const { setProduct, getProduct, searchItems, addSuggestions } = require('./product.repo');
const { redisClient } = require('../../config');

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
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        let product = await getProduct(id);
        if (!product) {
            let pool = await sql.connect(config.sql);
            const sqlQueries = await loadSqlQueries('product');
            product = (await pool.request().input('id', sql.UniqueIdentifier, id).query(sqlQueries.productById))
                .recordset[0];
        }

        return product;
    } catch (error) {
        throw error;
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
        throw error;
    }
};

const searchProducts = async ({ sortBy, order, categoryId, q, page, shopId }) => {
    try {
        const option = {
            LIMIT: {
                from: (Number(page) - 1) * Number(process.env.ROW_OF_PAGE),
                size: Number(process.env.ROW_OF_PAGE),
            },
        };

        if (sortBy) {
            option.SORTBY = {
                BY: sortBy,
                DIRECTION: order.toUpperCase(),
            };
        }

        let query = '';
        if (!shopId) {
            query = '*';
            if (categoryId !== '0' || q) {
                query = categoryId !== '0' ? `@categoryId:[${categoryId} ${categoryId}]` : ' ';
                query += q ? `@name:(${q})` : '';
            }
        } else {
            query = `@shopId:{${shopId.replaceAll('-', '\\-')}}`;
            if (categoryId !== '0' || q) {
                query = categoryId !== '0' ? `${query} @categoryId:[${categoryId} ${categoryId}]` : query;
                query = q ? `${query} @name:(${q})` : query;
            }
        }
        return await searchItems('idx:products', query, option);
    } catch (error) {
        throw error;
    }
};

const suggestProducts = async (q) => {
    try {
        const isExist = await redisClient.ft.sugLen('birds_suggestion');
        if (isExist === 0) await addSuggestions();

        let sugList = [];
        sugList = await redisClient.ft.sugGet('birds_suggestion', q);
        if (sugList.length === 0) {
            let count = 0;
            let prefix = q.split(/(?<=^\S+)\s/)[1];
            do {
                if (prefix) {
                    sugList = await redisClient.ft.sugGet('birds_suggestion', prefix);
                    prefix = prefix.split(/(?<=^\S+)\s/)[1];
                    count++;
                } else break;
            } while (sugList.length === 0 || count <= 2);
        }

        return sugList;
    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
};

const createProduct = async ({ name, shopId, description, price, image, categoryId }) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const result = await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('shopId', sql.UniqueIdentifier, shopId)
            .input('description', sql.NVarChar, description)
            .input('price', sql.Float, price)
            .input('image', sql.VarChar, image)
            .input('categoryId', sql.Int, categoryId)
            .query(sqlQueries.createProduct);

        const productId = result.recordset[0].id;
        const product = await getProductById(productId);
        product.sold = 0;
        console.log(product);
        await setProduct(product);
        return product;
    } catch (error) {
        throw error;
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

        const foundProduct = await getProduct(updated.recordset[0].id);
        const product = {
            ...updated.recordset[0],
            sold: foundProduct.sold,
        };

        await setProduct(product);
        return product;
    } catch (error) {
        throw error;
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

        const foundProduct = await getProduct(deleted.recordset[0].id);
        const product = {
            ...deleted.recordset[0],
            sold: foundProduct.sold,
        };

        await setProduct(product);
        return product;
    } catch (error) {
        throw error;
    }
};

const setAllProductToRedis = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('product');
        const list = (await pool.request().query(sqlQueries.getAllProducts)).recordset;
        if (list.length > 0) {
            for (const product of list) {
                const foundProduct = await getProduct(product.id);
                if (!foundProduct)
                    await setProduct({
                        ...product,
                        sold: 0,
                    });
            }
        }

        return 'OK';
    } catch (error) {
        throw error;
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
    setAllProductToRedis,
    suggestProducts,
};

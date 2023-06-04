const sql = require('mssql');
const createHttpError = require('http-errors');
const { getUserCart } = require('../cart');
const { getProductById } = require('../product');
const { readAccountById } = require('../auth');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');

/* 
    {
        userId,
        shopOrderIds: [
            {
                shopId,
                items: [
                    {
                        ...product,
                        quantity,
                        price,
                        name
                    },
                ]
            }
        ]
    }
*/

const checkProductByServer = async (items) => {
    return await Promise.all(
        items.map(async (item) => {
            const foundProduct = await getProductById(item.id);
            if (foundProduct) {
                return {
                    ...item,
                    price: Number(foundProduct.price),
                    subTotal: Number(foundProduct.price) * Number(item.quantity),
                };
            }
        }),
    );
};

const checkoutReview = async ({ userId, shopOrderIds }) => {
    try {
        const foundCart = await getUserCart({ userId });
        if (!foundCart) return createHttpError.BadRequest('Cart not found');

        const checkoutOrder = {
            totalPrice: 0,
        };

        const shopOrderIdsNew = [];

        for (let index = 0; index < shopOrderIds.length; index++) {
            const { shopId, items } = shopOrderIds[index];

            const checkProductServer = await checkProductByServer(items);
            if (!checkProductServer[0]) createHttpError.BadRequest('Order wrong!');

            const checkoutPrice = checkProductServer.reduce((sum, item) => sum + item.subTotal, 0);
            checkoutOrder.totalPrice += checkoutPrice;

            shopOrderIdsNew.push({
                shop: await readAccountById(shopId, 'seller'),
                items: checkProductServer,
            });
        }

        return {
            shopOrderIds,
            shopOrderIdsNew,
            checkoutOrder,
        };
    } catch (error) {
        throw error;
    }
};

const insertOperation = async (request, data1) => {
    request.input('data1', sql.NVarChar(40), data1);

    const result = await request.execute('dbo.insertOperation');

    return result.recordsets;
};

const updateOperation = async (request, data2) => {
    request.input('data2', sql.NVarChar(40), data2);

    const result = await request.execute('dbo.updateOperation');

    return result.recordsets;
};

const placeOrder = async ({ shopOrderIds, userId }) => {
    try {
        const { shopOrderIdsNew, checkoutOrder } = await checkoutReview({ shopOrderIds, userId });

        let pool = await sql.connect(config.sql);
        const sqlQueries = await loadSqlQueries('checkout');

        const transaction = new sql.Transaction(pool);
        try {
            await transaction.begin();

            const request = new sql.Request(transaction);

            const results = await Promise.all([insertOperation(request, data1), updateOperation(request, data2)]);

            await transaction.commit();
            return results;
        } catch (err) {
            await transaction.rollback();
            throw err;
        } finally {
            await dbConn.close();
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    checkoutReview,
    placeOrder,
};

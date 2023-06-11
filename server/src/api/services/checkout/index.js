const sql = require('mssql');
const createHttpError = require('http-errors');
const { getUserCart } = require('../cart');
const { getProductById } = require('../product');
const { readAccountById } = require('../auth');
const config = require('../../config');
const { loadSqlQueries } = require('../../utils/sql_utils');
const { redisClient } = require('../../config');

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

const insertOrderHeader = async (request, userId, shopOrderIdsNew) => {
    try {
        const orderHeaderIds = [];
        const sqlQueries = await loadSqlQueries('checkout');
        request.input('customerId', sql.UniqueIdentifier, userId);
        for (let index = 0; index < shopOrderIdsNew.length; index++) {
            const element = shopOrderIdsNew[index];
            const shopId = element.shop.id;
            request.replaceInput('shopId', sql.UniqueIdentifier, shopId);
            const result = await request.query(sqlQueries.insertOrderHeader);
            const orderHeaderId = result.recordset[0].id;

            const items = element.items;
            for (let j = 0; j < items.length; j++) {
                const product = items[j];

                request
                    .replaceInput('orderHeaderId', sql.UniqueIdentifier, orderHeaderId)
                    .replaceInput('productId', sql.UniqueIdentifier, product.id)
                    .replaceInput('quantity', sql.Int, product.quantity)
                    .replaceInput('price', sql.Float, product.price);
                await request.query(sqlQueries.insertOrderDetail);
            }

            orderHeaderIds.push(orderHeaderId);
        }
        return orderHeaderIds;
    } catch (error) {
        throw error;
    }
};

// const insertOrderDetail = async (request, query, shopOrderIdsNew, orderHeaderId) => {
//     try {
//         for (let index = 0; index < shopOrderIdsNew.length; index++) {
//             const element = shopOrderIdsNew[index];
//             const items = element.items;
//             for (let j = 0; j < items.length; j++) {
//                 const product = items[j];

//                 request
//                     .replaceInput('productId', sql.UniqueIdentifier, product.id)
//                     .replaceInput('quantity', sql.Int, product.quantity)
//                     .replaceInput('price', sql.Float, product.price);
//                 await request.query(query);
//             }
//         }
//         return 'OK';
//     } catch (error) {
//         throw error;
//     }
// };

// const insertShopIds = async (request, query, shopOrderIdsNew, orderHeaderId) => {
//     try {
//         for (let index = 0; index < shopOrderIdsNew.length; index++) {
//             const element = shopOrderIdsNew[index];
//             const shopId = element.shop.id;
//             request.replaceInput('shopId', sql.UniqueIdentifier, shopId);
//             await request.query(query);
//         }
//         return 'OK';
//     } catch (error) {
//         throw error;
//     }
// };

const placeOrder = async ({ shopOrderIds, userId }) => {
    try {
        const { shopOrderIdsNew, checkoutOrder } = await checkoutReview({ shopOrderIds, userId });

        let pool = new sql.ConnectionPool(config.sql);
        await pool.connect();

        let transaction = new sql.Transaction(pool);
        try {
            await transaction.begin();
            const request = new sql.Request(transaction);

            const orderHeaderIds = await insertOrderHeader(request, userId, shopOrderIdsNew);

            for (let index = 0; index < shopOrderIdsNew.length; index++) {
                const orderByShop = shopOrderIdsNew[index];

                for (let j = 0; j < orderByShop.items.length; j++) {
                    const product = orderByShop.items[j];

                    redisClient.hDel(`cart:${userId}`, `product:${product.id}`);
                }
            }

            const response = {
                orderHeaderIds,
                userId,
                shopOrderIdsNew,
                checkoutOrder,
                cartList: await getUserCart({ userId }),
            };

            await transaction.commit();
            return response;
        } catch (err) {
            await transaction.rollback();
            throw err;
        } finally {
            // await pool;
            await pool.close();
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    checkoutReview,
    placeOrder,
};

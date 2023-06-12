const createHttpError = require('http-errors');
const fs = require('fs');
const { SchemaFieldTypes } = require('redis');
const { redisClient } = require('../../config');
const { join } = require('path');

const createProductIndex = async () => {
    const existingIndex = await redisClient.ft._LIST();
    if (existingIndex.includes('idx:products')) return;

    await redisClient.ft.create(
        'idx:products',
        {
            '$.id': {
                type: SchemaFieldTypes.TEXT,
                AS: 'id',
            },
            '$.name': {
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true,
                AS: 'name',
            },
            '$.shopId': {
                type: SchemaFieldTypes.TEXT,
                AS: 'shopId',
            },
            '$.description': {
                type: SchemaFieldTypes.TEXT,
                AS: 'description',
            },
            '$.price': {
                type: SchemaFieldTypes.NUMERIC,
                SORTABLE: true,
                AS: 'price',
            },
            '$.image': {
                type: SchemaFieldTypes.TEXT,
                AS: 'image',
            },
            '$.categoryId': {
                type: SchemaFieldTypes.NUMERIC,
                AS: 'categoryId',
            },
            '$.enabled': {
                type: SchemaFieldTypes.TAG,
                AS: 'enabled',
            },
            '$.sold': {
                type: SchemaFieldTypes.NUMERIC,
                SORTABLE: true,
                AS: 'sold',
            },
        },
        {
            ON: 'JSON',
            PREFIX: 'product:',
        },
    );
};

const setProduct = async (product = {}) => {
    await createProductIndex();
    return await redisClient.json.set(`product:${product.id}`, '$', product);
};

const getProduct = async (productId) => {
    return await redisClient.json.get(`product:${productId}`);
};

const updateSold = async (productId, quantity) => {
    return await redisClient.json.numIncrBy(`product:${productId}`, '.sold', quantity);
};

const searchItems = async (index, query, option) => {
    return await redisClient.ft.search(index, query, option);
};

const addSuggestions = async () => {
    try {
        const allFileContents = fs.readFileSync(join(process.cwd(), 'src/data/vn_birds_v3.txt'), 'utf-8');
        const lines = allFileContents.split(/\r?\n/);
        for (const line of lines) {
            await redisClient.ft.sugAdd('birds_suggestion', line, 1);
            let count = 0;
            let prefix = line.split(/(?<=^\S+)\s/)[1];
            do {
                if (prefix) {
                    sugList = await redisClient.ft.sugAdd('birds_suggestion', prefix, 1);
                    prefix = prefix.split(/(?<=^\S+)\s/)[1];
                    count++;
                } else break;
            } while (count < 2);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    setProduct,
    getProduct,
    updateSold,
    searchItems,
    addSuggestions,
};

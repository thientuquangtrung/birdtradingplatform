const dateFormat = require('dateformat');
const querystring = require('qs');
const crypto = require('crypto');
const { checkoutReview, placeOrder } = require('../checkout');
const createHttpError = require('http-errors');

const createVNPayUrl = async (payload) => {
    try {
        const { checkoutOrder } = await checkoutReview(payload);

        var tmnCode = process.env.VNP_TMN_CODE;
        var secretKey = process.env.VNP_HASH_SECRET;
        var vnpUrl = process.env.VNP_URL;
        var returnUrl = process.env.CHECKOUT_RETURN_URL;

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = checkoutOrder.totalPrice;
        var bankCode = payload.bankCode || 'NCB';
        var ipAddr = payload.ipAddr;

        var currCode = 'VND';
        // var orderType = payload.orderType;
        var locale = payload.language;
        if (!locale) {
            locale = 'vn';
        }
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        console.log(vnpUrl);
        return vnpUrl;
    } catch (error) {
        throw error;
    }
};

const getVNPayTransactionResult = async ({ vnp_Params, userId, shopOrderIds }) => {
    try {
        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        var config = require('config');
        var secretKey = config.get('vnp_HashSecret');
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            var orderId = vnp_Params['vnp_TxnRef'];
            var transactionId = vnp_Params['vnp_TransactionNo'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            // const result = await placeOrder({ shopOrderIds, userId, payment: 'VNPAY', transactionId });

            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

const getVNPayReturn = async ({ vnp_Params, userId, shopOrderIds }) => {
    try {
        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        var tmnCode = process.env.VNP_TMN_CODE;
        var secretKey = process.env.VNP_HASH_SECRET;

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            var orderId = vnp_Params['vnp_TxnRef'];
            var transactionId = vnp_Params['vnp_TransactionNo'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            const result = await placeOrder({ shopOrderIds, userId, payment: 'VNPAY', transactionId });

            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

module.exports = {
    createVNPayUrl,
    getVNPayTransactionResult,
    getVNPayReturn,
};

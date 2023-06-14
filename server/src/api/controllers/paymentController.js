const createError = require('http-errors');
const dateFormat = require('dateformat');
const querystring = require('qs');
const crypto = require('crypto');
const paypal = require('../services/payment/paypal');

const createPaypalOrder = async (req, res, next) => {
    try {
        const order = await paypal.createOrder(req.body);
        return res.json(order);
    } catch (error) {
        next(error);
    }
};

const capturePaypalOrder = async (req, res, next) => {
    try {
        const { orderID } = req.body;
        const captureData = await paypal.capturePayment(orderID);
        return res.json(captureData);
    } catch (error) {
        next(error);
    }
};

const createVNPayUrl = async (req, res, next) => {
    try {
        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var tmnCode = process.env.VNP_TMN_CODE;
        var secretKey = process.env.VNP_HASH_SECRET;
        var vnpUrl = process.env.VNP_URL;
        var returnUrl = process.env.VNP_RETURN_URL;

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        var bankCode = req.body.bankCode || 'NCB';

        var currCode = 'VND';
        var orderInfo = `Thanh toan Bird Trading Platform. So tien: ${amount} ${currCode}`;
        // var orderType = req.body.orderType;
        var locale = req.body.language;
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
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        // vnp_Params['vnp_OrderType'] = orderType;
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

        return res.send({
            status: 200,
            redirect_url: vnpUrl,
        });
    } catch (error) {
        next(error);
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
    createPaypalOrder,
    capturePaypalOrder,
    createVNPayUrl,
};

const createError = require('http-errors');
const dateFormat = require('dateformat');
const querystring = require('qs');
const crypto = require('crypto');
const paypal = require('../services/payment/paypal');
const { placeOrder } = require('../services/checkout');

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
        const { checkoutOrder } = await placeOrder(req.body);

        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var tmnCode = process.env.VNP_TMN_CODE;
        var secretKey = process.env.VNP_HASH_SECRET;
        var vnpUrl = process.env.VNP_URL;
        var returnUrl = process.env.PAY_RETURN_URL;

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = checkoutOrder.totalPrice;
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

const createMomoPayUrl = async (request, response, next) => {
    try {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        const { checkoutOrder } = await placeOrder(request.body);
        var partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
        var accessKey = process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85';
        var secretkey = process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = 'pay with MoMo';
        var redirectUrl = process.env.PAY_RETURN_URL;
        var ipnUrl = 'https://callback.url/notify';
        // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
        var amount = checkoutOrder.totalPrice;
        var requestType = 'payWithATM';
        var extraData = ''; //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------');
        console.log(rawSignature);
        //signature
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretkey).update(rawSignature).digest('hex');
        console.log('--------------------SIGNATURE----------------');
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'en',
        });
        //Create the HTTPS objects
        const https = require('https');
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };
        //Send the request and get the response
        let redirect_url = '';
        const req = https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (body) => {
                console.log('Body: ');
                console.log(body);
                console.log('payUrl: ');
                console.log(JSON.parse(body).payUrl);
                redirect_url = JSON.parse(body).payUrl;
            });
            res.on('end', () => {
                console.log('No more data in response.');
                response.send({
                    redirect_url,
                });
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log('Sending....');
        req.write(requestBody);
        req.end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPaypalOrder,
    capturePaypalOrder,
    createVNPayUrl,
    createMomoPayUrl,
};

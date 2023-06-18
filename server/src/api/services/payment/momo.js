const { checkoutReview, placeOrder } = require('../checkout');
const createError = require('http-errors');
const crypto = require('crypto');

const createMomoPayUrl = async (payload) => {
    try {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        const { checkoutOrder } = await checkoutReview(payload);
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

        const redirect_url = await getPayUrl(options, requestBody);
        return {
            status: 200,
            message: 'OK',
            redirect_url,
        };
    } catch (error) {
        throw error;
    }
};

async function getPayUrl(options, requestBody) {
    return new Promise((resolve, reject) => {
        //Send the request and get the response
        const https = require('https');
        const req = https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (body) => {
                console.log('Body: ');
                console.log(body);
                console.log('payUrl: ');
                console.log(JSON.parse(body).payUrl);
                resolve(JSON.parse(body).payUrl);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            reject(e);
        });
        // write data to request body
        console.log('Sending....');
        req.write(requestBody);
        req.end();
    });
}

module.exports = {
    createMomoPayUrl,
};

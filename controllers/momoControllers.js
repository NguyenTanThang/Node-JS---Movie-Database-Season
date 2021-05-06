const uuid = require('uuid');
const https = require('https');
const {CURRENT_URL, CURRENT_CLIENT_URL} = require("../config/config")
const MomoPayment = require("../models/MomoPayment");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const uuidv1 = uuid.v1;
const {
    dateToMili,
    miliToDate,
    convertDaysIntoMili
} = require("../utils/utils");
const crypto = require('crypto');

//parameters send to MoMo get get payUrl
var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
var hostname = "https://test-payment.momo.vn"
var path = "/gw_payment/transactionProcessor"

/*
var partnerCode = "MOMOAVD320201026"
var accessKey = "5dSfBkOKPBjFAwpj"
var secretKey = "RlaUY2vtf66FzVoL7X6ugYqa1k3MqJJu"
*/

/*
var partnerCode = "MOMO"
var accessKey = "F8BBA842ECF85"
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
*/

var partnerCode = "MOMOBKUN20180529"
var accessKey = "klm05TvNBzhg7h7j"
var secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa"

var returnUrl = `${CURRENT_URL}/momos/callback`
var notifyurl = `${CURRENT_URL}/momos/callback`
var orderInfo = "Pay with MoMo"

/*
var returnUrl = "https://momo.vn/return"
var notifyurl = "https://callback.url/notify"
*/

const callBackURL = async (req, res) => {
    console.log(req.query)
    const {
        message,
        orderId,
        requestId,
        signature,
        amount
    } = req.query;

    const existedPayment = await MomoPayment.findOne({
        orderId,
        requestId,
    });

    if (message === "Success") {
        const planID = existedPayment.planID;
        const existedPlan = await Plan.findById(planID);
        const durationInMili = convertDaysIntoMili(existedPlan.durationInDays) + dateToMili(Date.now());

        const subscription = await new Subscription({
            customerID: existedPayment.customerID,
            planID: existedPlan._id,
            ended_date: miliToDate(durationInMili),
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();
    } else {
    };

    await MomoPayment.findOneAndUpdate({
        orderId,
        requestId,
        signature,
        amount
    }, {
        message
    })
    
    res.redirect(CURRENT_CLIENT_URL);
}

const getPayURL = async (request, response) => {
    var {
        amount,
        customerID,
        planID
    } = request.params;

    const orderId = uuidv1()
    const requestId = uuidv1()
    const requestType = "captureMoMoWallet"
    const extraData = "merchantName=Payment;merchantId=" //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

    //before sign HMAC SHA256 with format
    //partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
    var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const body = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        returnUrl: returnUrl,
        notifyUrl: notifyurl,
        extraData: extraData,
        requestType: requestType,
        signature: signature
    });
    //Create the HTTPS objects
    var options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/gw_payment/transactionProcessor',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    let bodyTestRes = "";

    let momoPayment = await new MomoPayment({
        orderId,
        requestId,
        signature,
        amount,
        customerID,
        planID
    }).save();
    console.log(momoPayment);

    //Send the request and get the response
    console.log("Sending....")
    var req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (bodyRes) => {
            bodyTestRes += bodyRes;
        });
        res.on('end', () => {
            console.log(bodyTestRes);
            response.json({
                payUrl: JSON.parse(bodyTestRes).payUrl
            })
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(body);
    req.end();
}

module.exports = {
    getPayURL,
    callBackURL
}
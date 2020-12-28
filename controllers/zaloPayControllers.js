// Node v10.15.3
const axios = require('axios'); // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const ZaloPayment = require("../models/ZaloPayment");
const {CURRENT_CLIENT_URL} = require("../config/config");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const {
    dateToMili,
    miliToDate,
    convertDaysIntoMili
} = require("../utils/utils");

// APP INFO
const config = {
    app_id: "554",
    key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
    key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const generateZaloPayURL = async (masterReq, masterRes) => {
    const {amount, planID, customerID} = masterReq.params;

    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount,
        description: `Let's Flix - Payment for the order #${transID}`,
        bank_code: "zalopayapp",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const zaloPayment = await new ZaloPayment({
        appTransID: order.app_trans_id,
        appID: config.app_id,
        macID: order.mac,
        amount,
        customerID,
        planID
    }).save();
    console.log(zaloPayment);

    axios.post(config.endpoint, null, {
            params: order
        })
        .then(res => {
            console.log(res.data);
            masterRes.json(res.data);
        })
        .catch(err => console.log(err));
}


const zaloCallback = async (req, res) => {

    const {apptransid, status} = req.query;

    if (status == 1) {
        const existedPayment = await ZaloPayment.findOne({appTransID: apptransid});
        const planID = existedPayment.planID;
        const existedPlan = await Plan.findById(planID);
        const durationInMili = convertDaysIntoMili(existedPlan.durationInDays) + dateToMili(Date.now());

        const subscription = await new Subscription({
            customerID: existedPayment.customerID,
            planID: existedPlan._id,
            ended_date: miliToDate(durationInMili)
        }).save();
    }

    await ZaloPayment.findOneAndUpdate({
        appTransID: apptransid
    }, {
        status
    })

    console.log(req.query);
    res.redirect(CURRENT_CLIENT_URL);
}

module.exports = {
    zaloCallback,
    generateZaloPayURL
}
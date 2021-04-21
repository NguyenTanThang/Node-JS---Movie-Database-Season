const PaypalPayment = require("../models/PaypalPayment");
const A_OR_AN = "a";
const APP_NAME = "paypal payment";
const {getPaypalAuthorizationToken, checkPaymentStatus} = require("../requests/paypalRequests");
const {
    dateToMili,
    miliToDate,
    convertDaysIntoMili
} = require("../utils/utils");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

const paypalCallback = async (req, res) => {
    try {
        const {
            orderID,
            customerID,
            amount,
            planID
        } = req.body;

        const paypalRes = await getPaypalAuthorizationToken(
            async (error, response, body) => {

                try {

                    if (!error && response.statusCode == 200) {
                        const {access_token} = JSON.parse(body);
                        const paypalPaymentRes = await checkPaymentStatus(access_token, orderID);
                        const {status} = paypalPaymentRes;
    
                        if (status === "COMPLETED") {
                            const paypalPayment = new PaypalPayment({
                                orderID,
                                customerID,
                                amount,
                                planID,
                                status,
                                created_date: Date.now(),
                                last_modified_date: Date.now()
                            }).save();
    
                            const existedPlan = await Plan.findById(planID);

                            const durationInMili = convertDaysIntoMili(existedPlan.durationInDays) + dateToMili(Date.now());
    
                            const subscription = await new Subscription({
                                customerID: customerID,
                                planID: planID,
                                ended_date: miliToDate(durationInMili),
                                created_date: Date.now(),
                                last_modified_date: Date.now()
                            }).save();
                        }
    
                        res.json({
                            success: true,
                            data: paypalPaymentRes,
                            status: 200
                        });
                    }

                } catch (err) {
                    console.log(err);
                }
                
            }
        );
        
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

module.exports = {
    paypalCallback
}
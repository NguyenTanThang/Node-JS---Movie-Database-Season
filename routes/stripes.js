var express = require('express');
var router = express.Router();
const {
    stripePay,
    getStripePaymentByID
} = require("../controllers/stripePaymentControllers");

router.post('/pay', stripePay);

router.get('/paymentIntentID/:paymentIntentID', getStripePaymentByID);

module.exports = router;

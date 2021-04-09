var express = require('express');
var router = express.Router();
const {
    generateZaloPayURL,
    zaloCallback,
    generateZaloPayGatewayURL
} = require("../controllers/zaloPayControllers");

router.get('/amount/:amount/customerID/:customerID/planID/:planID', generateZaloPayURL);

router.get('/gateway/amount/:amount/customerID/:customerID/planID/:planID', generateZaloPayGatewayURL);

//router.get('/generateZaloPayURL', generateZaloPayURL);

router.get('/callback', zaloCallback);

module.exports = router;

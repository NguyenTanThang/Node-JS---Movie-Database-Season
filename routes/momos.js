var express = require('express');
var router = express.Router();
const {
    getPayURL,
    callBackURL
} = require("../controllers/momoControllers");

router.get('/amount/:amount/customerID/:customerID/planID/:planID', getPayURL);

router.get('/callback', callBackURL);

module.exports = router;

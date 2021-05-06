var express = require('express');
var router = express.Router();
const {
    paypalCallback
} = require("../controllers/paypalControllers");

router.post('/callback', paypalCallback);

module.exports = router;

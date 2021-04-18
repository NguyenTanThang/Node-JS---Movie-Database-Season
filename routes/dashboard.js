var express = require('express');
var router = express.Router();
const {
    getCustomerDashboardData,
    getRevenueData,
    getNewCustomerData
} = require("../controllers/dashboardControllers");

router.get('/customer-data', getCustomerDashboardData);

router.get('/revenue-data', getRevenueData);

router.get('/new-customer-data', getNewCustomerData);

module.exports = router;

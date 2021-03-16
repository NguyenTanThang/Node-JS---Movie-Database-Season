var express = require('express');
var router = express.Router();
const {
    getCustomerDashboardData,
    getRevenueData
} = require("../controllers/dashboardControllers");

router.get('/customer-data', getCustomerDashboardData);

router.get('/revenue-data', getRevenueData);

module.exports = router;

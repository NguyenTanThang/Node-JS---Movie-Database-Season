var express = require('express');
var router = express.Router();
const {
    getAllSubscriptions,
    getSubscriptionByID,
    addSubscription,
    editSubscription,
    deleteSubscription,
    getSubscriptionByCustomerID,
    getSubscriptionStatusByCustomerID
} = require("../controllers/subscriptionControllers");

router.get('/', getAllSubscriptions);

router.get('/:id', getSubscriptionByID);

router.get('/customerID/:customerID', getSubscriptionByCustomerID);

router.get('/status/customerID/:customerID', getSubscriptionStatusByCustomerID);

router.post('/add', addSubscription);

router.put('/edit/:id', editSubscription);

router.delete('/delete/:id', deleteSubscription);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
    getAllSubscriptions,
    getSubscriptionByID,
    addSubscription,
    editSubscription,
    deleteSubscription,
    getSubscriptionByCustomerID,
    getSubscriptionStatusByCustomerID,
    
} = require("../controllers/subscriptionControllers");
const {
    authenticateToken,
    allowAdmin
} = require("../utils/jwtAuth");

router.get('/', getAllSubscriptions);

router.get('/:id', getSubscriptionByID);

router.get('/customerID/:customerID', getSubscriptionByCustomerID);

router.get('/status/customerID/:customerID', getSubscriptionStatusByCustomerID);

router.post('/add', addSubscription);

router.put('/edit/:id', authenticateToken, allowAdmin, editSubscription);

router.delete('/delete/:id', authenticateToken, allowAdmin, deleteSubscription);

module.exports = router;

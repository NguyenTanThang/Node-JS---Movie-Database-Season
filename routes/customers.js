var express = require('express');
var router = express.Router();
const {
    getAllCustomers,
    getCustomerByID,
    addCustomer,
    editCustomer,
    deleteCustomer,
    validateCustomer,
    customerLogin,
    customerSignup
} = require("../controllers/customerControllers");

router.get('/', getAllCustomers);

router.get('/:id', getCustomerByID);

router.get('/validate/:customerID', validateCustomer);

router.post('/add', addCustomer);

router.post('/login', customerLogin);

router.post('/signup', customerSignup);

router.put('/edit/:id', editCustomer);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;

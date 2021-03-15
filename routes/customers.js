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
    customerSignup,
    changePassword,
    resetPassword,
    resetPasswordTokenRequest,
    getResetPasswordToken
} = require("../controllers/customerControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllCustomers);

router.get('/:id', getCustomerByID);

router.get('/validate/:customerID', validateCustomer);

router.get('/reset-password-token/:token', getResetPasswordToken);

router.post('/add', addCustomer);

router.post('/reset-password-token', resetPasswordTokenRequest);

router.post('/login', customerLogin);

router.post('/signup', customerSignup);

router.put('/edit/:id', editCustomer);

router.put('/change-password/:customerID', changePassword);

router.put('/reset-password/:token', resetPassword);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;

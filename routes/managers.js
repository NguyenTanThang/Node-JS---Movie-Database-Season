var express = require('express');
var router = express.Router();
const {
    getAllManagers,
    getManagerByID,
    addManager,
    editManager,
    deleteManager,
    managerLogin,
    changePassword
} = require("../controllers/managerControllers");
const {
    authenticateToken,
    allowAdmin
} = require("../utils/jwtAuth");

router.get('/', getAllManagers);

router.get('/:id', getManagerByID);

router.post('/add', authenticateToken, allowAdmin, addManager);

router.post('/login', managerLogin);

router.put('/edit/:id', authenticateToken, allowAdmin, editManager);

router.put('/change-password/:id', changePassword);

router.delete('/delete/:id', authenticateToken, allowAdmin,deleteManager);

module.exports = router;

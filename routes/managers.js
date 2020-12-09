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

router.get('/', getAllManagers);

router.get('/:id', getManagerByID);

router.post('/add', addManager);

router.post('/login', managerLogin);

router.put('/edit/:id', editManager);

router.put('/change-password/:id', changePassword);

router.delete('/delete/:id', deleteManager);

module.exports = router;

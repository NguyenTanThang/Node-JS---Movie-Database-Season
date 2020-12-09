var express = require('express');
var router = express.Router();
const {
    getAllManagerRoles,
    getManagerRoleByID,
    addManagerRole,
    editManagerRole,
    deleteManagerRole,
} = require("../controllers/managerRoleControllers");

router.get('/', getAllManagerRoles);

router.get('/:id', getManagerRoleByID);

router.post('/add', addManagerRole);

router.put('/edit/:id', editManagerRole);

router.delete('/delete/:id', deleteManagerRole);

module.exports = router;

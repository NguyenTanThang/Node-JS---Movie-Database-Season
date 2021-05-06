var express = require('express');
var router = express.Router();
const {
    getAllPlans,
    getPlanByID,
    addPlan,
    editPlan,
    deletePlan,
    getPlanByPrice
} = require("../controllers/planControllers");
const {
    authenticateToken,
    allowAdmin
} = require("../utils/jwtAuth");

router.get('/', getAllPlans);

router.get('/price', getPlanByPrice);

router.get('/:id', getPlanByID);

router.post('/add', authenticateToken, allowAdmin, addPlan);

router.put('/edit/:id', authenticateToken, allowAdmin, editPlan);

router.delete('/delete/:id', authenticateToken, allowAdmin, deletePlan);

module.exports = router;

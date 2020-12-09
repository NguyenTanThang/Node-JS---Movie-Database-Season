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

router.get('/', getAllPlans);

router.get('/price', getPlanByPrice);

router.get('/:id', getPlanByID);

router.post('/add', addPlan);

router.put('/edit/:id', editPlan);

router.delete('/delete/:id', deletePlan);

module.exports = router;

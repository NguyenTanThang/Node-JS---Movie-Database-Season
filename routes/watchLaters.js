var express = require('express');
var router = express.Router();
const {
    getAllWatchLaters,
    getAllWatchLatersByCustomerID,
    getAllWatchLatersByMovieIDAndCustomerID,
    getAllWatchLatersByID,
    addWatchLater,
    editWatchLater,
    deleteWatchLater
} = require("../controllers/watchLaterControllers");

router.get('/', getAllWatchLaters);

router.get('/customerID/:customerID', getAllWatchLatersByCustomerID);

router.get('/customerID/:customerID/movieID/:movieID', getAllWatchLatersByMovieIDAndCustomerID);

router.get('/:id', getAllWatchLatersByID);

router.post('/add', addWatchLater);

router.put('/edit/:id', editWatchLater);

router.delete('/delete/:id', deleteWatchLater);

module.exports = router;

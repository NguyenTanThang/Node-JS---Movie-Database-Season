var express = require('express');
var router = express.Router();
const {
    getAllWatchHistory,
    getAllWatchHistoryByCustomerID,
    getWatchHistoryByID,
    addWatchHistory,
    deleteWatchHistory,
    getWatchHistoryByMovieIDAndCustomerID
} = require("../controllers/watchHistoryControllers");

router.get('/', getAllWatchHistory);

router.get('/customerID/:customerID', getAllWatchHistoryByCustomerID);

router.get('/customerID/:customerID/movieID/:movieID', getWatchHistoryByMovieIDAndCustomerID);

router.get('/historyID/:historyID', getWatchHistoryByID);

router.post('/add', addWatchHistory);

router.delete('/delete/:historyID', deleteWatchHistory);

module.exports = router;

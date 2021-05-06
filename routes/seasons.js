var express = require('express');
var router = express.Router();
const {
    checkURLUsageSeasons,
    getAllSeasons,
    getSeasonByID,
    addSeason,
    editSeason,
    deleteSeason,
    getSeasonsBySeriesID,
    addSeasonValidation,
    editSeasonValidation,
    reformAllSeasons
} = require("../controllers/seasonControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllSeasons);

router.get('/reform', reformAllSeasons);

router.get('/seriesID/:seriesID', getSeasonsBySeriesID);

router.get('/:id', getSeasonByID);

router.get('/checkURLUsage/:id', checkURLUsageSeasons);

router.post('/validation/add', addSeasonValidation);

router.post('/add', authenticateToken, addSeason);

router.put('/edit/:id', authenticateToken, editSeason);

router.put('/validation/edit/:id', editSeasonValidation);

router.delete('/delete/:id', authenticateToken, deleteSeason);

module.exports = router;

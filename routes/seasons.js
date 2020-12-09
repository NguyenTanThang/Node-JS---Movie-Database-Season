var express = require('express');
var router = express.Router();
const {
    checkURLUsageSeasons,
    getAllSeasons,
    getSeasonByID,
    addSeason,
    editSeason,
    deleteSeason,
    getSeasonsBySeriesID
} = require("../controllers/seasonControllers");

router.get('/', getAllSeasons);

router.get('/seriesID/:seriesID', getSeasonsBySeriesID);

router.get('/:id', getSeasonByID);

router.get('/checkURLUsage/:id', checkURLUsageSeasons);

router.post('/add', addSeason);

router.put('/edit/:id', editSeason);

router.delete('/delete/:id', deleteSeason);

module.exports = router;

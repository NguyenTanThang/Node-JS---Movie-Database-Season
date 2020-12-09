var express = require('express');
var router = express.Router();
const {
    getAllSeries,
    getSeriesByID,
    addSeries,
    editSeries,
    deleteSeries,
    reformAllSeries,
    getAllSeriesByGenre,
    checkURLUsageSeries
} = require("../controllers/seriesControllers");

router.get('/reformAll', reformAllSeries);

router.get('/', getAllSeries);

router.get('/genre/:genre', getAllSeriesByGenre);

router.get('/:id', getSeriesByID);

router.get('/checkURLUsage/:id', checkURLUsageSeries);

router.post('/add', addSeries);

router.put('/edit/:id', editSeries);

router.delete('/delete/:id', deleteSeries);

module.exports = router;

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
    checkURLUsageSeries,
    getSeriesByIMDB_ID
} = require("../controllers/seriesControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/reformAll', reformAllSeries);

router.get('/', getAllSeries);

router.get('/genre/:genre', getAllSeriesByGenre);

router.get('/:id', getSeriesByID);

router.get('/IMDB_ID/:IMDB_ID', getSeriesByIMDB_ID);

router.get('/checkURLUsage/:id', checkURLUsageSeries);

router.post('/add', authenticateToken, addSeries);

router.put('/edit/:id', authenticateToken, editSeries);

router.delete('/delete/:id', authenticateToken, deleteSeries);

module.exports = router;

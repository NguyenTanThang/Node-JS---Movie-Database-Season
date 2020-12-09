var express = require('express');
var router = express.Router();
const {
    getAllEpisodes,
    getEpisodeByID,
    getEpisodeBySeasonID,
    addEpisode,
    editEpisode,
    deleteEpisode,
    deleteEpisodeWithSeasonIDAndEpNum,
    checkURLUsageEpisode,
} = require("../controllers/episodeControllers");

router.get('/', getAllEpisodes);

router.get('/:id', getEpisodeByID);

router.get('/seasonID/:seasonID', getEpisodeBySeasonID);

router.get('/checkURLUsage/seasonID/:seasonID', checkURLUsageEpisode)

router.post('/add', addEpisode);

router.put('/edit/:id', editEpisode);

router.delete('/delete/:id', deleteEpisode);

router.delete('/delete/seasonID/:seasonID/epNum/:epNum', deleteEpisodeWithSeasonIDAndEpNum);

module.exports = router;

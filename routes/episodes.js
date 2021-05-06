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
    addEpsiodeValidation,
    editEpsiodeValidation,
    reformAllEpisodes
} = require("../controllers/episodeControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllEpisodes);

router.get('/reform', reformAllEpisodes);

router.get('/:id', getEpisodeByID);

router.get('/seasonID/:seasonID', getEpisodeBySeasonID);

router.get('/checkURLUsage/seasonID/:seasonID', checkURLUsageEpisode);

router.post('/add', authenticateToken, addEpisode);

router.post('/validation/add', addEpsiodeValidation);

router.put('/edit/:id', authenticateToken, editEpisode);

router.put('/validation/edit/:id', editEpsiodeValidation);

router.delete('/delete/:id', authenticateToken, deleteEpisode);

router.delete('/delete/seasonID/:seasonID/epNum/:epNum', authenticateToken, deleteEpisodeWithSeasonIDAndEpNum);

module.exports = router;

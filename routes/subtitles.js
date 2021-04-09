var express = require('express');
var router = express.Router();
const {
    getAllSubtitles,
    getSubtitleByID,
    addSubtitle,
    editSubtitle,
    deleteSubtitle,
    deleteSubtitleByMovieID,
    deleteSubtitleByEpisodeID,
    getSubtitlesByMovieID,
    getSubtitlesByEpisodeID
} = require("../controllers/subtitlesControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllSubtitles);

router.get('/:id', getSubtitleByID);

router.get('/movieID/:movieID', getSubtitlesByMovieID);

router.get('/episodeID/:episodeID', getSubtitlesByEpisodeID);

router.post('/add', authenticateToken, addSubtitle);

router.put('/edit/:id', authenticateToken, editSubtitle);

router.delete('/delete/:id', authenticateToken, deleteSubtitle);

router.delete('/delete/movieID/:movieID', authenticateToken, deleteSubtitleByMovieID);

router.delete('/delete/episodeID/:episodeID', authenticateToken, deleteSubtitleByEpisodeID);

module.exports = router;

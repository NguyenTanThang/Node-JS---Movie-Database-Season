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

router.get('/', getAllSubtitles);

router.get('/:id', getSubtitleByID);

router.get('/movieID/:movieID', getSubtitlesByMovieID);

router.get('/episodeID/:episodeID', getSubtitlesByEpisodeID);

router.post('/add', addSubtitle);

router.put('/edit/:id', editSubtitle);

router.delete('/delete/:id', deleteSubtitle);

router.delete('/delete/movieID/:movieID', deleteSubtitleByMovieID);

router.delete('/delete/episodeID/:episodeID', deleteSubtitleByEpisodeID);

module.exports = router;

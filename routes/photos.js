var express = require('express');
var router = express.Router();
const {
    getAllPhotos,
    getPhotoByID,
    getPhotosByMovieID,
    getPhotosBySeriesID,
    getPhotosBySeasonID,
    addPhoto,
    editPhoto,
    deletePhoto,
    deletePhotoByMovieID,
    deletePhotoBySeriesID,
    deletePhotoBySeasonID,
} = require("../controllers/photoControllers");

router.get('/', getAllPhotos);

router.get('/:id', getPhotoByID);

router.get('/movieID/:movieID', getPhotosByMovieID);
router.get('/seriesID/:seriesID', getPhotosBySeriesID);
router.get('/seasonID/:seasonID', getPhotosBySeasonID);

router.post('/add', addPhoto);

router.put('/edit/:id', editPhoto);

router.delete('/delete/:id', deletePhoto);

router.delete('/delete/movieID/:movieID', deletePhotoByMovieID);
router.delete('/delete/seriesID/:seriesID', deletePhotoBySeriesID);
router.delete('/delete/seasonID/:seasonID', deletePhotoBySeasonID);

module.exports = router;

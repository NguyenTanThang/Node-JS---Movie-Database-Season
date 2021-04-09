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
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllPhotos);

router.get('/:id', getPhotoByID);

router.get('/movieID/:movieID', getPhotosByMovieID);
router.get('/seriesID/:seriesID', getPhotosBySeriesID);
router.get('/seasonID/:seasonID', getPhotosBySeasonID);

router.post('/add', authenticateToken, addPhoto);

router.put('/edit/:id', authenticateToken, editPhoto);

router.delete('/delete/:id', authenticateToken, deletePhoto);

router.delete('/delete/movieID/:movieID', authenticateToken, deletePhotoByMovieID);
router.delete('/delete/seriesID/:seriesID', authenticateToken, deletePhotoBySeriesID);
router.delete('/delete/seasonID/:seasonID', authenticateToken, deletePhotoBySeasonID);

module.exports = router;

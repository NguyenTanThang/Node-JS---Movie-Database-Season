var express = require('express');
var router = express.Router();
const {
    getAllMovies,
    getMovieByID,
    addMovie,
    editMovie,
    deleteMovie,
    reformAllMovies,
    getAllMoviesByGenre,
    checkURLUsageMovie
} = require("../controllers/movieControllers");

router.get('/', getAllMovies);

router.get('/genre/:genre', getAllMoviesByGenre);

router.get('/reform', reformAllMovies);

router.get('/:id', getMovieByID);

router.get('/checkURLUsage/:id', checkURLUsageMovie);

router.post('/add', addMovie);

router.put('/edit/:id', editMovie);

router.delete('/delete/:id', deleteMovie);

module.exports = router;

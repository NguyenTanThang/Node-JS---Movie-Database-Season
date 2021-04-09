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
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllMovies);

router.get('/genre/:genre', getAllMoviesByGenre);

router.get('/reform', reformAllMovies);

router.get('/:id', getMovieByID);

router.get('/checkURLUsage/:id', checkURLUsageMovie);

router.post('/add', authenticateToken, addMovie);

router.put('/edit/:id', authenticateToken, editMovie);

router.delete('/delete/:id', authenticateToken, deleteMovie);

module.exports = router;

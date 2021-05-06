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
    checkURLUsageMovie,
    getMovieByIMDB_ID,
    addMovieValidation,
    editMovieValidation
} = require("../controllers/movieControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllMovies);

router.get('/genre/:genre', getAllMoviesByGenre);

router.get('/reform', reformAllMovies);

router.get('/:id', getMovieByID);

router.get('/IMDB_ID/:IMDB_ID', getMovieByIMDB_ID);

router.get('/checkURLUsage/:id', checkURLUsageMovie);

router.post('/add', authenticateToken, addMovie);

router.post('/validation/add', addMovieValidation);

router.put('/edit/:id', authenticateToken, editMovie);

router.put('/validation/edit/:id', editMovieValidation);

router.delete('/delete/:id', authenticateToken, deleteMovie);

module.exports = router;

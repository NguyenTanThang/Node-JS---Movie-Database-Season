var express = require('express');
var router = express.Router();
const {
    getAllGenres,
    getGenreByID,
    addGenre,
    editGenre,
    deleteGenre,
} = require("../controllers/genreControllers");
const {
    authenticateToken
} = require("../utils/jwtAuth");

router.get('/', getAllGenres);

router.get('/:id', getGenreByID);

router.post('/add', authenticateToken, addGenre);

router.put('/edit/:id', authenticateToken, editGenre);

router.delete('/delete/:id', authenticateToken, deleteGenre);

module.exports = router;

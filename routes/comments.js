var express = require('express');
var router = express.Router();
const {
    getAllComments,
    getCommentByCustomerID,
    getCommentByMovieID,
    addComment,
    editComment,
    deleteComment
} = require("../controllers/commentControllers");

router.get('/', getAllComments);

router.get('/customerID/:customerID', getCommentByCustomerID);

router.get('/movieID/:movieID', getCommentByMovieID);

router.post('/add', addComment);

router.put('/edit/:commentID', editComment);

router.delete('/delete/:commentID', deleteComment);

module.exports = router;

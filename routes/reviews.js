var express = require('express');
var router = express.Router();
const {
    getAllReviews,
    getReviewByID,
    getReviewsByMovieID,
    addReview,
    editReview,
    deleteReview,
    getReviewByCustomerIDAndMovieID,
    removeAllReviews,
    getReviewByCustomerID
} = require("../controllers/reviewControllers");

router.get('/', getAllReviews);

router.get('/removeAll', removeAllReviews);

router.get('/:id', getReviewByID);

router.get('/movieID/:movieID', getReviewsByMovieID);

router.get('/movieID/:movieID/customerID/:customerID', getReviewByCustomerIDAndMovieID);

router.get('/customerID/:customerID', getReviewByCustomerID);

router.post('/add', addReview);

router.put('/edit/:id', editReview);

router.delete('/delete/:id', deleteReview);

module.exports = router;

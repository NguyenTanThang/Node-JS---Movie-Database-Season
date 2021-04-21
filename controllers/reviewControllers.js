const Review = require("../models/Review");
const {
    updateMovieRating,
    getMovieByID
} = require("../requests/movieRequests");
const {
    updateSeriesRating
} = require("../requests/seriesRequests");
const {
    getEpisodeByID,
    updateEpisodeRating
} = require("../requests/episodeRequests");
const {
    getSeasonByID,
    updateSeasonRating
} = require("../requests/seasonRequests");
const {
    isObjectEmpty
} = require("../utils/utils");
const A_OR_AN = "a";
const APP_NAME = "review";

const removeAllReviews = async (req, res) => {
    try {
        const reviews = await Review.deleteMany();

        res.json({
            success: true,
            data: reviews,
            length: reviews.length
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();

        res.json({
            success: true,
            data: reviews,
            length: reviews.length
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getReviewByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const review = await Review.findById(id);

        res.json({
            success: true,
            data: review
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getReviewByCustomerIDAndMovieID = async (req, res) => {
    try {
        const {
            movieID,
            customerID
        } = req.params;
        const review = await Review.findOne({
            movieID,
            customerID
        });

        res.json({
            success: true,
            data: review
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getReviewByCustomerID = async (req, res) => {
    try {
        const {
            customerID
        } = req.params;
        const review = await Review.find({
            customerID
        });

        res.json({
            success: true,
            data: review
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getReviewsByMovieID = async (req, res) => {
    try {
        const {
            movieID
        } = req.params;
        const reviews = await Review.find({movieID});

        res.json({
            success: true,
            data: reviews,
            length: reviews.length
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const changeRatingOfMovie = async (movieID) => {
    let meanRating = 0;
    const allReviews = await Review.find({
        movieID
    });

    allReviews.forEach(reviewItem => {
        meanRating += reviewItem.grading;
    });
    meanRating = meanRating / allReviews.length;

    await updateMovieRating(movieID, meanRating);
}

const changeRatingOfSeries = async (seriesID) => {
    let meanRating = 0;
    const allReviews = await Review.find({
        movieID: seriesID
    });

    allReviews.forEach(reviewItem => {
        meanRating += reviewItem.grading;
    });
    meanRating = meanRating / allReviews.length;

    await updateSeriesRating(seriesID, meanRating);
}

const changeRatingOfEpisode = async (episodeID) => {
    let meanRating = 0;
    const allReviews = await Review.find({
        movieID: episodeID
    });

    allReviews.forEach(reviewItem => {
        meanRating += reviewItem.grading;
    });
    meanRating = meanRating / allReviews.length;

    await updateEpisodeRating(episodeID, meanRating);
}

const changeRatingOfSeason = async (seasonID) => {
    let meanRating = 0;
    const allReviews = await Review.find({
        movieID: seasonID
    });

    allReviews.forEach(reviewItem => {
        meanRating += reviewItem.grading;
    });
    meanRating = meanRating / allReviews.length;

    await updateSeasonRating(seasonID, meanRating);
}

const addReview = async (req, res) => {
    try {
        let {
            grading,
            customerID,
            movieID
        } = req.body;
        const review = await new Review({
            grading,
            customerID,
            movieID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        const existedMovie = await getMovieByID(movieID);
        const existedSeason = await getSeasonByID(movieID);
        const existedEpisode = await getEpisodeByID(movieID);

        if (existedMovie) {
            await changeRatingOfMovie(movieID)
        } 
        else if (existedSeason) {
            await changeRatingOfSeason(movieID)
        }
        else if (existedEpisode) {
            await changeRatingOfEpisode(movieID)
        }
        else {
            await changeRatingOfSeries(movieID)
        }

        res.json({
            success: true,
            data: review,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const editReview = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            grading,
            customerID,
            movieID
        } = req.body;
        const last_modified_date = Date.now();
        const review = await Review.findByIdAndUpdate(id, {
            grading,
            customerID,
            movieID,
            last_modified_date
        });

        const existedMovie = await getMovieByID(movieID);
        const existedSeason = await getSeasonByID(movieID);
        const existedEpisode = await getEpisodeByID(movieID);

        if (existedMovie) {
            await changeRatingOfMovie(movieID)
        } 
        else if (existedSeason) {
            await changeRatingOfSeason(movieID)
        }
        else if (existedEpisode) {
            await changeRatingOfEpisode(movieID)
        }
        else {
            await changeRatingOfSeries(movieID)
        }

        const updatedReview = await Review.findById(id);

        res.json({
            success: true,
            data: updatedReview,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const deleteReview = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const review = await Review.findByIdAndDelete(id);
        const {
            movieID
        } = review;

        const existedMovie = await getMovieByID(movieID);

        if (!existedMovie || isObjectEmpty(existedMovie)) {
            await changeRatingOfSeries(movieID)
        } else {
            await changeRatingOfMovie(movieID)
        }

        res.json({
            success: true,
            data: review,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

module.exports = {
    getAllReviews,
    getReviewByID,
    getReviewsByMovieID,
    addReview,
    editReview,
    deleteReview,
    getReviewByCustomerIDAndMovieID,
    removeAllReviews,
    getReviewByCustomerID
}
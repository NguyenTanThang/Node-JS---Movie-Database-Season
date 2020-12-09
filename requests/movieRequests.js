const Movie = require("../models/Movie");

const updateMovieRating = async (movieID, rating) => {
    try {
        const movie = await Movie.findByIdAndUpdate(movieID, {
            rating
        })

        return movie;
    } catch (error) {
        console.log(error);
    }
}

const getMovieByID = async (movieID) => {
    try {
        const movie = await Movie.findById(movieID)

        return movie;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateMovieRating,
    getMovieByID
}

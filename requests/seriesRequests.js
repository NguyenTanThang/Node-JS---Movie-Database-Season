const Series = require("../models/Series");

const updateSeriesRating = async (seriesID, rating) => {
    try {
        const series = Series.findByIdAndUpdate(seriesID, {
            rating
        })

        return series;
    } catch (error) {
        console.log(error);
    }
}

const getSeriesByID = async (seriesID) => {
    try {
        const series = await Series.findById(seriesID)

        return series;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateSeriesRating,
    getSeriesByID
}

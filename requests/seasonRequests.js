const Season = require("../models/Season");
const {
    removeAllEpisodeBySeasonID
} = require("./episodeRequests");

const removeAllSeasonsBySeriesID = async (seriesID) => {
    try {
        const seasons = Season.find({
            seriesID
        });
        for (let i = 0; i < array.length; i++) {
            const season = seasons[i];
            await removeAllEpisodeBySeasonID(season._id);
            await Season.findByIdAndDelete(season._id);
        }
    } catch (error) {
        console.log(error);
    }
}

const updateSeasonRating = async (seasonID, rating) => {
    try {
        const season = Season.findByIdAndUpdate(seasonID, {
            rating
        })

        return season;
    } catch (error) {
        console.log(error);
    }
}

const getSeasonByID = async (seasonID) => {
    try {
        const season = await Season.findById(seasonID)

        return season;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateSeasonRating,
    getSeasonByID,
    removeAllSeasonsBySeriesID
}

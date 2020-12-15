const Season = require("../models/Season");

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
    getSeasonByID
}

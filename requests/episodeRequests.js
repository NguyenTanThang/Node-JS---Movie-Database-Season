const Episode = require("../models/Episode");

const getSeriesByID = async (seriesID) => {
    try {
        const episodes = await Episode.find({seriesID})

        return episodes;
    } catch (error) {
        console.log(error);
    }
}

const removeEpisodesBySeriesID = async (seriesID) => {
    try {
        const episodes = await Episode.find({seriesID})

        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            await Episode.findByIdAndDelete(episode._id);
        }

        return episodes;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSeriesByID,
    removeEpisodesBySeriesID
}

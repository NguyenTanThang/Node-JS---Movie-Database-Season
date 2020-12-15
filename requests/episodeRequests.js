const Episode = require("../models/Episode");

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

const updateEpisodeRating = async (episodeID, rating) => {
    try {
        const episode = Episode.findByIdAndUpdate(episodeID, {
            rating
        })

        return episode;
    } catch (error) {
        console.log(error);
    }
}

const getEpisodeByID = async (episodeID) => {
    try {
        const episode = await Episode.findById(episodeID)

        return episode;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeEpisodesBySeriesID,
    updateEpisodeRating,
    getEpisodeByID
}

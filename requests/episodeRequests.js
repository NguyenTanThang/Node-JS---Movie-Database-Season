const Episode = require("../models/Episode");
const {
    removeSubtitleByVideoURL
} = require("./subtitleRequests")

const removeAllEpisodeBySeasonID = async (seasonID) => {
    try {
        const episodes = Episode.find({
            seasonID
        });
        for (let i = 0; i < episodes.length; i++) {
            const episode = episodes[i];
            await removeSubtitleByVideoURL(episode.episodeURL);
            await Episode.findByIdAndDelete(episode._id)
        }
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

const removeEpisodesBySeasonID = async (seasonID) => {
    try {
        const episodes = await Episode.find({seasonID})

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
    getEpisodeByID,
    removeEpisodesBySeasonID,
    removeAllEpisodeBySeasonID
}

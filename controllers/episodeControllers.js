const Episode = require("../models/Episode");
const A_OR_AN = "an";
const APP_NAME = "episode";
const {
    exchangeURLToFileDirectory
} = require("../utils/utils");

const getAllEpisodes = async (req, res) => {
    try {
        const episodes = await Episode.find();

        res.json({
            success: true,
            data: episodes,
            length: episodes.length,
            status: 200
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

const getEpisodeByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const episode = await Episode.findById(id);

        res.json({
            success: true,
            data: episode,
            status: 200
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

const getEpisodeBySeasonID = async (req, res) => {
    try {
        const {
            seasonID
        } = req.params;
        const episodes = await Episode.find({
            seasonID
        }).sort({episodeNum: 1});

        res.json({
            success: true,
            data: episodes,
            length: episodes.length,
            status: 200
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

const checkURLUsageEpisode = async (req, res) => {
    try {
        const {
            seasonID
        } = req.params;

        const episodes = await Episode.find({
            seasonID
        });
        let episodeList = await Episode.find();
        episodeList = episodeList.filter(episodeItem => {
            return episodeItem.seasonID != seasonID;
        })
        let episodeURLUsage = [];

        if (!episodes || episodes.length === 0) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        for (let index = 0; index < episodes.length; index++) {
            const episodeMasterItem = episodes[index];

            const episodeActualURL = exchangeURLToFileDirectory(episodeMasterItem.episodeURL);

            for (let indexJ = 0; indexJ < episodeList.length; indexJ++) {
                const episodeItem = episodeList[indexJ];

                let {
                    episodeURL
                } = episodeItem;
                episodeURL = exchangeURLToFileDirectory(episodeURL)

                if (episodeActualURL === episodeURL) {
                    episodeURLUsage.push({
                        episodeItem,
                        innerIndexIndicator: indexJ,
                        indexIndicator: index,
                    });
                    continue;
                }
            }
        }

        res.json({
            success: true,
            data: {
                episodes,
                episodeList,
                episodeURLUsage
            },
            status: 200
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

const addEpisode = async (req, res) => {
    try {
        let {
            name,
            description,
            seasonID,
            episodeURL,
            episodeNum
        } = req.body;
        const episode = await new Episode({
            name,
            description,
            seasonID,
            episodeURL,
            episodeNum
        }).save();

        res.json({
            success: true,
            data: episode,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`,
            status: 200
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

const editEpisode = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            name,
            description,
            episodeURL,
            episodeNum
        } = req.body;
        const last_modified_date = Date.now();
        let updatedEpisodeObject = {
            name,
            description,
            episodeNum,
            last_modified_date
        };

        if (episodeURL) {
            updatedEpisodeObject.episodeURL = episodeURL;
        }

        const episode = await Episode.findByIdAndUpdate(id, updatedEpisodeObject);

        res.json({
            success: true,
            data: episode,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`,
            status: 200
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

const deleteEpisode = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const episode = await Episode.findByIdAndDelete(id);

        res.json({
            success: true,
            data: episode,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`,
            status: 200
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

const deleteEpisodeWithSeasonIDAndEpNum = async (req, res) => {
    try {
        const {
            seasonID,
            epNum
        } = req.params;

        const episode = await Episode.findOneAndDelete({
            seasonID,
            episodeNum: parseInt(epNum)
        });

        res.json({
            success: true,
            data: episode,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`,
            status: 200
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
    getAllEpisodes,
    getEpisodeByID,
    getEpisodeBySeasonID,
    addEpisode,
    editEpisode,
    deleteEpisode,
    deleteEpisodeWithSeasonIDAndEpNum,
    checkURLUsageEpisode,
}
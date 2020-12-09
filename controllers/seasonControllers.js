const Season = require("../models/Season");
const A_OR_AN = "a";
const APP_NAME = "season";
const {
    getMessage,
    addSeasonSchema,
    editSeasonSchema
} = require("../utils/validator");
const {
    exchangeURLToFileDirectory
} = require("../utils/utils");

const checkURLUsageSeasons = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const season = await Season.findById(id);
        let seasonsList = await Season.find();
        seasonsList = seasonsList.filter(seasonItem => {
            return seasonItem._id != id;
        })
        let trailerURLUsage = [];
        let posterURLUsage = [];

        if (!season) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const trailerActualURL = exchangeURLToFileDirectory(season.trailerURL);
        const posterActualURL = exchangeURLToFileDirectory(season.posterURL);

        for (let index = 0; index < seasonsList.length; index++) {
            const seasonItem = seasonsList[index];
            let {trailerURL, posterURL} = seasonItem;
            trailerURL = exchangeURLToFileDirectory(trailerURL);
            posterURL = exchangeURLToFileDirectory(posterURL);

            if (trailerActualURL === trailerURL) {
                trailerURLUsage.push(seasonItem);
            }

            if (posterActualURL === posterURL) {
                posterURLUsage.push(seasonItem);
            }
        }

        res.json({
            success: true,
            data: {
                season,
                trailerURLUsage,
                posterURLUsage
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

const getAllSeasons = async (req, res) => {
    try {
        const seasons = await Season.find();

        res.status(200).json({
            success: true,
            data: seasons,
            length: seasons.length,
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

const getSeasonByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const season = await Season.findById(id);

        if (!season) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: season,
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

const getSeasonsBySeriesID = async (req, res) => {
    try {
        const {
            seriesID
        } = req.params;
        const seasons = await Season.find({seriesID});

        res.json({
            success: true,
            data: seasons,
            length: seasons.length,
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

const addSeason = async (req, res) => {
    try {
        let {
            name,
            seriesID,
            description,
            trailerURL,
            posterURL,
            seasonNum
        } = req.body;

        const validation = addSeasonSchema.validate({
            name,
            seriesID,
            description,
            trailerURL,
            posterURL,
            seasonNum
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedSeason = await Season.findOne({
            name
        });

        if (existedSeason) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const season = await new Season({
            name,
            seriesID,
            description,
            trailerURL,
            posterURL,
            seasonNum
        }).save();

        res.json({
            success: true,
            data: season,
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

const editSeason = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            name,
            description,
            trailerURL,
            posterURL,
            seasonNum
        } = req.body;

        const validation = editSeasonSchema.validate({
            name,
            description,
            trailerURL,
            posterURL,
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedSeason = await Season.findById(id);

        if (!existedSeason) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        let updatedSeasonObject = {
            name,
            description,
            last_modified_date,
            seasonNum
        };

        if (posterURL) {
            updatedSeasonObject.posterURL = posterURL
        }
        if (trailerURL) {
            updatedSeasonObject.trailerURL = trailerURL
        }

        const season = await Season.findByIdAndUpdate(id, updatedSeasonObject);

        res.json({
            success: true,
            data: season,
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

const deleteSeason = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let existedSeason = await Season.findById(id);

        if (!existedSeason) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const season = await Season.findByIdAndDelete(id);
        //await removeEpisodesBySeriesID(id);

        res.json({
            success: true,
            data: season,
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
    checkURLUsageSeasons,
    getAllSeasons,
    getSeasonByID,
    addSeason,
    editSeason,
    deleteSeason,
    getSeasonsBySeriesID
}
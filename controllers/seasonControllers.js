const Season = require("../models/Season");
const A_OR_AN = "a";
const APP_NAME = "season";
const {
    getMessage,
    addSeasonSchema,
    editSeasonSchema
} = require("../utils/validator");
const {
    removeAllEpisodeBySeasonID
} = require("../requests/episodeRequests");
const {
    exchangeURLToFileDirectory
} = require("../utils/utils");

const reformAllSeasons = async (req, res) => {
    try {
        let seasons = await Season.find().sort([['created_date', 'ascending']]);

        /*
        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            const {_id} = movie;
            
            await Movie.findByIdAndUpdate(_id, {
                rating: 0
            })
        }
        */

       for (let index = 0; index < seasons.length; index++) {
            const season = seasons[index];
            const {_id} = season;
        
            await Season.findByIdAndUpdate(_id, {
                rating: 0
            })
        }

        seasons = await Season.find().sort([['created_date', 'ascending']]);
        
        /*

        var obj = {
            movies: []
         };

        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            obj.movies.push(movie._doc);
        }

        var json = JSON.stringify(obj);
        var fileURL = `E:/Test Things Out/Test Movies Website (refined) (act 2)/1. Official/sever/seeders/jsonFiles/movies.json`

        var exists = fs.existsSync(fileURL);

        if (exists) {
            fs.unlinkSync(fileURL);
        }

        fs.writeFileSync(fileURL, json, 'utf8');

        */

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
        let seasons = await Season.find({seriesID});
        seasons = seasons.sort(function(seasonA, seasonB) {
            return seasonA.seasonNum - seasonB.seasonNum;
        });

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

const addSeasonValidation = async (req, res) => {
    try {
        let {
            seriesID,
            seasonNum
        } = req.body;

        const existedSeasonNum = await Season.find({
            seriesID,
            seasonNum
        });

        return res.json({
            success: true,
            data: {
                existedSeasonNum
            },
            message: ``,
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

const editSeasonValidation = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            seriesID,
            seasonNum
        } = req.body;

        let existedSeasonNum = await Season.find({
            seriesID,
            seasonNum
        });

        existedSeasonNum = existedSeasonNum.filter(existedSeasonNumItem => {
            return existedSeasonNumItem._id != id;
        });

        return res.json({
            success: true,
            data: {
                existedSeasonNum
            },
            message: ``,
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
            seasonNum,
            created_date: Date.now(),
            last_modified_date: Date.now()
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
        //await removeAllEpisodeBySeasonID(id);

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
    getSeasonsBySeriesID,
    addSeasonValidation,
    editSeasonValidation,
    reformAllSeasons
}
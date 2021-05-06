const Series = require("../models/Series");
const A_OR_AN = "a";
const APP_NAME = "series";
const {
    addSeriesSchema,
    editSeriesSchema,
    getMessage
} = require("../utils/validator");
const {
    getOMDBMovie
} = require("../requests/omdbRequests");
const {
    removeAllSeasonsBySeriesID
} = require("../requests/seasonRequests");
const {
    capitalizeFirstLetter,
    exchangeURLToFileDirectory
} = require("../utils/utils");
var fs = require('fs');

const reformAllSeries = async (req, res) => {
    try {
        let series = await Series.find().sort([['created_date', 'ascending']]);

        for (let index = 0; index < series.length; index++) {
            const seriesItem = series[index];
            const {_id, IMDB_ID} = seriesItem;
            const imdbSeries = await getOMDBMovie(IMDB_ID);
            
            await Series.findByIdAndUpdate(_id, {
                rating: 0,
                imdbSeries
            })
        }

        series = await Series.find().sort([['created_date', 'ascending']]);

        /*
        var obj = {
            series: []
         };

        for (let index = 0; index < series.length; index++) {
            const serie = series[index];
            obj.series.push(serie._doc);
        }

        var json = JSON.stringify(obj);
        var fileURL = `E:/Test Things Out/Test Movies Website (refined) (act 2)/1. Official/sever/seeders/jsonFiles/series.json`

        var exists = fs.existsSync(fileURL);

        if (exists) {
            fs.unlinkSync(fileURL);
        }

        fs.writeFileSync(fileURL, json, 'utf8');
        */

        res.status(200).json({
            success: true,
            data: series,
            length: series.length,
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

const getAllSeriesByGenre = async (req, res) => {
    try {
        let {genre} = req.params;
        genre = capitalizeFirstLetter(genre);
        let series = await Series.find().sort([['created_date', 'descending']]);

        series = series.filter(seriesItem => {
            return seriesItem.genres.includes(genre);
        })
        series = series.slice(0, 6);

        res.status(200).json({
            success: true,
            data: series,
            length: series.length,
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

const checkURLUsageSeries = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const series = await Series.findById(id);
        let seriesList = await Series.find();
        seriesList = seriesList.filter(seriesItem => {
            return seriesItem._id != id;
        })
        let trailerURLUsage = [];
        let posterURLUsage = [];

        if (!series) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const trailerActualURL = exchangeURLToFileDirectory(series.trailerURL);
        const posterActualURL = exchangeURLToFileDirectory(series.posterURL);

        for (let index = 0; index < seriesList.length; index++) {
            const seriesItem = seriesList[index];
            let {trailerURL, posterURL} = seriesItem;
            trailerURL = exchangeURLToFileDirectory(trailerURL);
            posterURL = exchangeURLToFileDirectory(posterURL);

            if (trailerActualURL === trailerURL) {
                trailerURLUsage.push(seriesItem);
            }

            if (posterActualURL === posterURL) {
                posterURLUsage.push(seriesItem);
            }
        }

        res.json({
            success: true,
            data: {
                series,
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

const getAllSeries = async (req, res) => {
    try {
        const series = await Series.find();

        res.status(200).json({
            success: true,
            data: series,
            length: series.length,
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

const getSeriesByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const series = await Series.findById(id);

        if (!series) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const {IMDB_ID} = series;
        const imdbSeries = await getOMDBMovie(IMDB_ID);
        let updatedSeries = await Series.findByIdAndUpdate(id, {imdbSeries})
        updatedSeries = await Series.findById(id);

        res.json({
            success: true,
            data: updatedSeries,
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

const getSeriesByIMDB_ID = async (req, res) => {
    try {
        const {
            IMDB_ID
        } = req.params;
        const series = await Series.findOne({IMDB_ID});
        
        res.json({
            success: true,
            data: series,
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

const addSeriesValidation = async (req, res) => {
    try {
        let {
            name,
            IMDB_ID
        } = req.body;

        const existedSeriesName = await Series.find({
            name
        });

        const existedSeriesIMDB = await Series.find({
            IMDB_ID
        });

        return res.json({
            success: true,
            data: {
                existedSeriesName,
                existedSeriesIMDB
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

const editSeriesValidation = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            name,
            IMDB_ID
        } = req.body;

        let existedSeriesName = await Series.find({
            name
        });

        let existedSeriesIMDB = await Series.find({
            IMDB_ID
        });

        existedSeriesName = existedSeriesName.filter(existedSeriesNameItem => {
            return existedSeriesNameItem._id != id;
        });

        existedSeriesIMDB = existedSeriesIMDB.filter(existedSeriesIMDBItem => {
            return existedSeriesIMDBItem._id != id;
        });

        return res.json({
            success: true,
            data: {
                existedSeriesName,
                existedSeriesIMDB
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

const addSeries = async (req, res) => {
    try {
        let {
            name,
            genres,
            description,
            trailerURL,
            posterURL,
            IMDB_ID,
        } = req.body;
        const validation = addSeriesSchema.validate({
            name,
            description,
            trailerURL,
            posterURL,
            IMDB_ID,
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedSeries = await Series.findOne({
            name
        });

        if (existedSeries) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const imdbSeries = await getOMDBMovie(IMDB_ID);

        const series = await new Series({
            name,
            genres,
            description,
            trailerURL,
            posterURL,
            IMDB_ID,
            imdbSeries,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: series,
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

const editSeries = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            name,
            genres,
            description,
            trailerURL,
            posterURL,
            IMDB_ID,
        } = req.body;

        const validation = editSeriesSchema.validate({
            name,
            description,
            trailerURL,
            posterURL,
            IMDB_ID,
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedSeries = await Series.findById(id);

        if (!existedSeries) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedSeries = await Series.findOne({
            name
        });

        if (duplicatedSeries && duplicatedSeries._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        let updatedSeriesObject = {
            name,
            genres,
            description,
            IMDB_ID,
            last_modified_date,
        };

        if (posterURL) {
            updatedSeriesObject.posterURL = posterURL
        }
        if (trailerURL) {
            updatedSeriesObject.trailerURL = trailerURL
        }

        const series = await Series.findByIdAndUpdate(id, updatedSeriesObject);

        res.json({
            success: true,
            data: series,
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

const deleteSeries = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let existedSeries = await Series.findById(id);

        if (!existedSeries) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const series = await Series.findByIdAndDelete(id);
        //await removeAllSeasonsBySeriesID(id);

        res.json({
            success: true,
            data: series,
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
    getAllSeries,
    getSeriesByID,
    addSeries,
    editSeries,
    deleteSeries,
    reformAllSeries,
    getAllSeriesByGenre,
    checkURLUsageSeries,
    getSeriesByIMDB_ID,
    addSeriesValidation,
    editSeriesValidation
}
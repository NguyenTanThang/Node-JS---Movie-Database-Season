const WatchLater = require("../models/WatchLater");
const {getMovieByID} = require("../requests/movieRequests");
const {getSeriesByID} = require("../requests/seriesRequests");
const A_OR_AN = "a";
const APP_NAME = "watch later item";

const getAllWatchLaters = async (req, res) => {
    try {
        const watchLaters = await WatchLater.find().sort([['created_date', 'descending']]);

        res.json({
            success: true,
            data: watchLaters,
            length: watchLaters.length
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

const getAllWatchLatersByCustomerID = async (req, res) => {
    try {
        const {customerID} = req.params;
        let watchLaters = await WatchLater.find({customerID}).sort([['created_date', 'descending']]);
        let movieList = [];
        let seriesList = [];

        for (let index = 0; index < watchLaters.length; index++) {
            const watchLaterItem = watchLaters[index];
            const {movieID} = watchLaterItem;

            let selectRecord = await getMovieByID(movieID);

            if (!selectRecord) {
                selectRecord = await getSeriesByID(movieID);
                seriesList.push(selectRecord);
                continue;
            }

            movieList.push(selectRecord);
        }

        res.json({
            success: true,
            data: {
                watchLaters,
                movieList,
                seriesList
            },
            length: watchLaters.length
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

const getAllWatchLatersByMovieIDAndCustomerID = async (req, res) => {
    try {
        const {customerID, movieID} = req.params;
        const watchLater = await WatchLater.findOne({customerID, movieID});

        res.json({
            success: true,
            data: watchLater
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

const getAllWatchLatersByID = async (req, res) => {
    try {
        const watchLater = await WatchLater.findById(id);

        res.json({
            success: true,
            data: watchLater,
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

const addWatchLater = async (req, res) => {
    try {
        let {movieID, customerID} = req.body;
        const watchLater = await new WatchLater({
            movieID, customerID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: watchLater,
            message: `Successfully created ${A_OR_AN} ${APP_NAME}`
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

const editWatchLater = async (req, res) => {
    try {
        const {id} = req.params;
        let {movieID, customerID} = req.body;
        const last_modified_date = Date.now();
        const watchLater = await WatchLater.findByIdAndUpdate(id, {
            movieID, customerID, last_modified_date
        });

        res.json({
            success: true,
            data: watchLater,
            message: `Successfully updated ${A_OR_AN} ${APP_NAME}`
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

const deleteWatchLater = async (req, res) => {
    try {
        const {id} = req.params;
        const watchLater = await WatchLater.findByIdAndDelete(id);

        res.json({
            success: true,
            data: watchLater,
            message: `Successfully deleted ${A_OR_AN} ${APP_NAME}`
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
    getAllWatchLaters,
    getAllWatchLatersByCustomerID,
    getAllWatchLatersByMovieIDAndCustomerID,
    getAllWatchLatersByID,
    addWatchLater,
    editWatchLater,
    deleteWatchLater
}
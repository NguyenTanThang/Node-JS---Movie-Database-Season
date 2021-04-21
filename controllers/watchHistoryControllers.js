const WatchHistory = require("../models/WatchHistory");
const {getMovieByID} = require("../requests/movieRequests");
const {getSeriesByID} = require("../requests/seriesRequests");
const A_OR_AN = "a";
const APP_NAME = "watch history item";

const getAllWatchHistory = async (req, res) => {
    try {
        const watchHistory = await WatchHistory.find().sort([['created_date', 'descending']]);

        res.json({
            success: true,
            data: watchHistory,
            length: watchHistory.length
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

const getAllWatchHistoryByCustomerID = async (req, res) => {
    try {
        const {customerID} = req.params;
        let watchHistory = await WatchHistory.find({customerID}).sort([['created_date', 'descending']]);
        let movieList = [];
        let seriesList = [];
        let movieDateList = [];
        let seriesDateList = [];

        for (let index = 0; index < watchHistory.length; index++) {
            const watchHistoryItem = watchHistory[index];
            const {movieID} = watchHistoryItem;

            let selectRecord = await getMovieByID(movieID);

            if (!selectRecord) {
                selectRecord = await getSeriesByID(movieID);
                seriesDateList.push(watchHistoryItem.created_date);
                seriesList.push(selectRecord);
                continue;
            }

            movieDateList.push(watchHistoryItem.created_date);
            movieList.push(selectRecord);
        }

        res.json({
            success: true,
            data: {
                watchHistory,
                movieList,
                seriesList,
                movieDateList,
                seriesDateList
            },
            length: watchHistory.length
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

const getWatchHistoryByMovieIDAndCustomerID = async (req, res) => {
    try {
        const {customerID, movieID} = req.params;
        const watchHistory = await WatchHistory.findOne({customerID, movieID});

        res.json({
            success: true,
            data: watchHistory
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

const getWatchHistoryByID = async (req, res) => {
    try {
        const {historyID} = req.params;
        const watchHistory = await WatchHistory.findById(historyID);

        res.json({
            success: true,
            data: watchHistory,
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

const addWatchHistory = async (req, res) => {
    try {
        let {movieID, customerID} = req.body;

        const existedWatchHistory = await WatchHistory.find({
            movieID, customerID
        });
        const last_modified_date = Date.now();
        const updatedWatchHistory = await WatchHistory.findByIdAndUpdate(existedWatchHistory._id, {
            movieID, customerID, last_modified_date
        });

        if (existedWatchHistory) {
            res.json({
                success: true,
                data: updatedWatchHistory,
                message: `Successfully created ${A_OR_AN} ${APP_NAME}`
            })
        }

        const watchHistory = await new WatchHistory({
            movieID, customerID,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: watchHistory,
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

const deleteWatchHistory = async (req, res) => {
    try {
        const {historyID} = req.params;
        const watchHistory = await WatchHistory.findByIdAndDelete(historyID);

        res.json({
            success: true,
            data: watchHistory,
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
    getAllWatchHistory,
    getAllWatchHistoryByCustomerID,
    getWatchHistoryByID,
    addWatchHistory,
    deleteWatchHistory,
    getWatchHistoryByMovieIDAndCustomerID
}
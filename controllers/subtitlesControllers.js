const Subtitle = require("../models/Subtitles");
const A_OR_AN = "a";
const APP_NAME = "subtitles";
const {getMessage} = require("../utils/validator");
const {getMovieByID} = require("../requests/movieRequests");
const {getEpisodeByID} = require("../requests/episodeRequests");

const getAllSubtitles = async (req, res) => {
    try {
        const subtitles = await Subtitle.find();

        res.json({
            success: true,
            data: subtitles,
            length: subtitles.length,
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

const getSubtitleByID = async (req, res) => {
    try {
        const {id} = req.params;
        const subtitle = await Subtitle.findById(id);

        if (!subtitle) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: subtitle,
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

const getSubtitlesByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;
        const movie = await getMovieByID(movieID);
        const subtitles = await Subtitle.find({videoID: movie._id});

        res.json({
            success: true,
            data: subtitles,
            length: subtitles.length,
            status: 200,
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

const getSubtitlesByEpisodeID = async (req, res) => {
    try {
        const {episodeID} = req.params;
        const episode = await getEpisodeByID(episodeID);
        const subtitles = await Subtitle.find({videoID: episode._id});

        res.json({
            success: true,
            data: subtitles,
            length: subtitles.length,
            status: 200,
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

const addSubtitle = async (req, res) => {
    try {
        let {videoID, languageLabel, subtitleURL} = req.body;

        /*
        const validation = addGenreSchema.validate({name});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedGenre = await Genre.findOne({name});

        if (existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }
        */

        const sub = await new Subtitle({
            videoID, languageLabel, subtitleURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: sub,
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

const editSubtitle = async (req, res) => {
    try {
        const {id} = req.params;
        let {videoID, languageLabel, subtitleURL} = req.body;

        /*
        const validation = addGenreSchema.validate({name});

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedGenre = await Genre.findById(id);

        if (!existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedGenre = await Genre.findOne({name});

        if (duplicatedGenre && duplicatedGenre._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }
        */

        const last_modified_date = Date.now();
        const subtitle = await Subtitle.findByIdAndUpdate(id, {
            ...req.body, last_modified_date
        });

        res.json({
            success: true,
            data: subtitle,
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

const deleteSubtitle = async (req, res) => {
    try {
        const {id} = req.params;

        /*
        let existedGenre = await Genre.findById(id);

        if (!existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }
        */

        const subtitle = await Subtitle.findByIdAndDelete(id);

        res.json({
            success: true,
            data: subtitle,
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

const deleteSubtitleByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;

        /*
        let existedGenre = await Genre.findById(id);

        if (!existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }
        */

        const movie = await getMovieByID(movieID);
        const subtitles = await Subtitle.find({
            videoID: movie._id
        });

        for (let i = 0; i < subtitles.length; i++) {
            const subtitleItem = subtitles[i];
            await Subtitle.findByIdAndDelete(subtitleItem._id);
        }

        res.json({
            success: true,
            data: subtitles,
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

const deleteSubtitleByEpisodeID = async (req, res) => {
    try {
        const {episodeID} = req.params;

        /*
        let existedGenre = await Genre.findById(id);

        if (!existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }
        */

        const episode = await getEpisodeByID(episodeID);
        const subtitles = await Subtitle.find({
            videoID: episode._id
        });

        for (let i = 0; i < subtitles.length; i++) {
            const subtitleItem = subtitles[i];
            await Subtitle.findByIdAndDelete(subtitleItem._id);
        }

        res.json({
            success: true,
            data: subtitles,
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
    getAllSubtitles,
    getSubtitleByID,
    addSubtitle,
    editSubtitle,
    deleteSubtitle,
    deleteSubtitleByMovieID,
    deleteSubtitleByEpisodeID,
    getSubtitlesByMovieID,
    getSubtitlesByEpisodeID
}
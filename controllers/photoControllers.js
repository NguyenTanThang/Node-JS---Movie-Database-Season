const Photo = require("../models/Photo");
const A_OR_AN = "a";
const APP_NAME = "photo";
const {getMessage} = require("../utils/validator");
const {getMovieByID} = require("../requests/movieRequests");
const {getSeriesByID} = require("../requests/seriesRequests");
const {getSeasonByID} = require("../requests/seasonRequests");

const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();

        res.json({
            success: true,
            data: photos,
            length: photos.length,
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

const getPhotoByID = async (req, res) => {
    try {
        const {id} = req.params;
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: photo,
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

const getPhotosByMovieID = async (req, res) => {
    try {
        const {movieID} = req.params;
        const movie = await getMovieByID(movieID);
        const photos = await Photo.find({recordID: movie._id});

        res.json({
            success: true,
            data: photos,
            length: photos.length,
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

const getPhotosBySeriesID = async (req, res) => {
    try {
        const {seriesID} = req.params;
        const series = await getSeriesByID(seriesID);
        const photos = await Photo.find({recordID: series._id});

        res.json({
            success: true,
            data: photos,
            length: photos.length,
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

const getPhotosBySeasonID = async (req, res) => {
    try {
        const {seasonID} = req.params;
        const season = await getSeasonByID(seasonID);
        const photos = await Photo.find({recordID: season._id});

        res.json({
            success: true,
            data: photos,
            length: photos.length,
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

const addPhoto = async (req, res) => {
    try {
        let {recordID, photoURL} = req.body;

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

        const photo = await new Photo({
            recordID, photoURL,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: photo,
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

const editPhoto = async (req, res) => {
    try {
        const {id} = req.params;
        let {recordID, photoURL} = req.body;

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
        const photo = await Photo.findByIdAndUpdate(id, {
            ...req.body, last_modified_date
        });

        res.json({
            success: true,
            data: photo,
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

const deletePhoto = async (req, res) => {
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

        const photo = await Photo.findByIdAndDelete(id);

        res.json({
            success: true,
            data: photo,
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

const deletePhotoByMovieID = async (req, res) => {
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
        const photos = await Photo.find({
            recordID: movie._id
        });

        for (let i = 0; i < photos.length; i++) {
            const phototem = photos[i];
            await Photo.findByIdAndDelete(phototem._id);
        }

        res.json({
            success: true,
            data: photos,
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

const deletePhotoBySeriesID = async (req, res) => {
    try {
        const {seriesID} = req.params;

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

        const series = await getSeriesByID(seriesID);
        const photos = await Photo.find({
            recordID: series._id
        });

        for (let i = 0; i < photos.length; i++) {
            const phototem = photos[i];
            await Photo.findByIdAndDelete(phototem._id);
        }

        res.json({
            success: true,
            data: photos,
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

const deletePhotoBySeasonID = async (req, res) => {
    try {
        const {seasonID} = req.params;

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

        const movie = await getSeasonByID(seasonID);
        const photos = await Photo.find({
            recordID: movie._id
        });

        for (let i = 0; i < photos.length; i++) {
            const phototem = photos[i];
            await Photo.findByIdAndDelete(phototem._id);
        }

        res.json({
            success: true,
            data: photos,
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
    getAllPhotos,
    getPhotoByID,
    getPhotosByMovieID,
    getPhotosBySeriesID,
    getPhotosBySeasonID,
    addPhoto,
    editPhoto,
    deletePhoto,
    deletePhotoByMovieID,
    deletePhotoBySeriesID,
    deletePhotoBySeasonID,
}
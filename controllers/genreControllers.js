const Genre = require("../models/Genre");
const A_OR_AN = "a";
const APP_NAME = "genre";
const {addGenreSchema, getMessage} = require("../utils/validator");

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();

        res.json({
            success: true,
            data: genres,
            length: genres.length,
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

const getGenreByID = async (req, res) => {
    try {
        const {id} = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        res.json({
            success: true,
            data: genre,
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

const addGenre = async (req, res) => {
    try {
        let {name} = req.body;
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

        const genre = await new Genre({
            name,
            created_date: Date.now(),
            last_modified_date: Date.now()
        }).save();

        res.json({
            success: true,
            data: genre,
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

const editGenre = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

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

        const last_modified_date = Date.now();
        const genre = await Genre.findByIdAndUpdate(id, {
            name, last_modified_date
        });

        res.json({
            success: true,
            data: genre,
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

const deleteGenre = async (req, res) => {
    try {
        const {id} = req.params;
        let existedGenre = await Genre.findById(id);

        if (!existedGenre) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const genre = await Genre.findByIdAndDelete(id);

        res.json({
            success: true,
            data: genre,
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
    getAllGenres,
    getGenreByID,
    addGenre,
    editGenre,
    deleteGenre,
}
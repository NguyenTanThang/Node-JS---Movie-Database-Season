const Movie = require("../models/Movie");
const A_OR_AN = "a";
const APP_NAME = "movie";
const {
    addMovieSchema,
    editMovieSchema,
    getMessage,
} = require("../utils/validator");
const {
    capitalizeFirstLetter,
    exchangeURLToFileDirectory
} = require("../utils/utils");
const {
    getOMDBMovie
} = require("../requests/omdbRequests");

const reformAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find().sort([['created_date', 'descending']]);

        /*
        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            const {_id} = movie;
            
            await Movie.findByIdAndUpdate(_id, {
                rating: 0
            })
        }
        */

       for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];
            const {_id, IMDB_ID} = movie;
        
            const imdbMovie = await getOMDBMovie(IMDB_ID);
            await Movie.findByIdAndUpdate(_id, {
                imdbMovie
            })
        }

        movies = await Movie.find().sort([['created_date', 'descending']]);

        res.status(200).json({
            success: true,
            data: movies,
            length: movies.length,
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

const getAllMovies = async (req, res) => {
    try {
        let movies = await Movie.find().sort([['created_date', 'descending']]);
        console.log(movies);
        

        res.status(200).json({
            success: true,
            data: movies,
            length: movies.length,
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

const getAllMoviesByGenre = async (req, res) => {
    try {
        let {genre} = req.params;
        genre = capitalizeFirstLetter(genre);
        let movies = await Movie.find().sort([['created_date', 'descending']]);

        movies = movies.filter(movieItem => {
            return movieItem.genres.includes(genre);
        })
        movies = movies.slice(0, 6);

        res.status(200).json({
            success: true,
            data: movies,
            length: movies.length,
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

const checkURLUsageMovie = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        
        const movie = await Movie.findById(id);
        let movies = await Movie.find();
        movies = movies.filter(movieItem => {
            return movieItem._id != id;
        })
        let movieURLUsage = [];
        let trailerURLUsage = [];
        let posterURLUsage = [];

        if (!movie) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const movieActualURL = exchangeURLToFileDirectory(movie.movieURL);
        const trailerActualURL = exchangeURLToFileDirectory(movie.trailerURL);
        const posterActualURL = exchangeURLToFileDirectory(movie.posterURL);
        
        for (let index = 0; index < movies.length; index++) {
            const movieItem = movies[index];
            let {movieURL, trailerURL, posterURL} = movieItem;
            movieURL = exchangeURLToFileDirectory(movieURL);
            trailerURL = exchangeURLToFileDirectory(trailerURL);
            posterURL = exchangeURLToFileDirectory(posterURL);

            if (movieActualURL === movieURL) {
                movieURLUsage.push(movieItem);
            }

            if (trailerActualURL === trailerURL) {
                trailerURLUsage.push(movieItem);
            }

            if (posterActualURL === posterURL) {
                posterURLUsage.push(movieItem);
            }
        }

        res.json({
            success: true,
            data: {
                movie,
                movieURLUsage,
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

const getMovieByID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        /*
        const movieActualURL = exchangeURLToFileDirectory(movie.movieURL);
        const trailerActualURL = exchangeURLToFileDirectory(movie.trailerURL);
        const posterActualURL = exchangeURLToFileDirectory(movie.posterURL);
        
        console.log(movieActualURL)
        console.log(trailerActualURL)
        console.log(posterActualURL)

        var movieURLRef = storageRef.child(movieActualURL);

        console.log(movieURLRef)
        */

        res.json({
            success: true,
            data: movie,
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

const addMovie = async (req, res) => {
    try {
        let {
            name,
            genres,
            description,
            trailerURL,
            movieURL,
            posterURL,
            IMDB_ID
        } = req.body;
        const validation = addMovieSchema.validate({
            name,
            description,
            trailerURL,
            movieURL,
            posterURL,
            IMDB_ID
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        const existedMovie = await Movie.findOne({
            name
        });
        const existedMovieIMDB = await Movie.findOne({
            IMDB_ID
        });

        if (existedMovie || existedMovieIMDB) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        const imdbMovie = await getOMDBMovie(IMDB_ID);

        const movie = await new Movie({
            name,
            genres,
            description,
            trailerURL,
            movieURL,
            posterURL,
            IMDB_ID,
            imdbMovie
        }).save();

        res.json({
            success: true,
            data: movie,
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

const editMovie = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            genres,
            description,
            trailerURL,
            movieURL,
            posterURL,
            IMDB_ID
        } = req.body;

        const validation = editMovieSchema.validate({
            name,
            description,
            trailerURL,
            movieURL,
            posterURL,
            IMDB_ID
        });

        if (validation.error) {
            return res.json({
                success: false,
                message: getMessage(validation),
                status: 400
            })
        }

        let existedMovie = await Movie.findById(id);

        if (!existedMovie) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        let duplicatedMovie = await Movie.findOne({
            name
        });

        if (duplicatedMovie && duplicatedMovie._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} is already existed`,
                status: 400
            })
        }

        let duplicatedMovieIMDB = await Movie.findOne({
            IMDB_ID
        });

        if (duplicatedMovieIMDB && duplicatedMovieIMDB._id != id) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} with this IMDB ID is already existed`,
                status: 400
            })
        }

        const last_modified_date = Date.now();
        const imdbMovie = await getOMDBMovie(IMDB_ID);

        let updatedMovieObject = {
            name,
            genres,
            description,
            IMDB_ID,
            last_modified_date,
            imdbMovie
        };
        if (posterURL) {
            updatedMovieObject.posterURL = posterURL
        }
        if (movieURL) {
            updatedMovieObject.movieURL = movieURL
        }
        if (trailerURL) {
            updatedMovieObject.trailerURL = trailerURL
        }
        const movie = await Movie.findByIdAndUpdate(id, updatedMovieObject);

        res.json({
            success: true,
            data: movie,
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

const deleteMovie = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let existedMovie = await Movie.findById(id);

        if (!existedMovie) {
            return res.json({
                success: false,
                message: `This ${APP_NAME} does not exist`,
                status: 400
            })
        }

        const movie = await Movie.findByIdAndDelete(id);


        res.json({
            success: true,
            data: movie,
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
    getAllMovies,
    getMovieByID,
    addMovie,
    editMovie,
    deleteMovie,
    reformAllMovies,
    getAllMoviesByGenre,
    checkURLUsageMovie
}
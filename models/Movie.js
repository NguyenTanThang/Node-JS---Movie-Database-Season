const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true,
    },
    trailerURL: {
        type: String,
        required: true,
        unique: true
    },
    movieURL: {
        type: String,
        required: true,
        unique: true
    },
    posterURL: {
        type: String,
        required: true,
        unique: true
    },
    IMDB_ID: {
        type: String,
        required: true
    },
    imdbMovie: {
        type: Object
    },
    rating: {
        type: Number,
        default: 0
    },
    last_modified_date: {
        type: Date,
        default: Date.now()
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("movies", schema);
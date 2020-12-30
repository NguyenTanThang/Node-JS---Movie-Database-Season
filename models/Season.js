const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    seriesID: {
        type: Schema.ObjectId, 
        ref: 'series',
        required: true
    },
    seasonNum: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    posterURL: {
        type: String,
        required: true
    },
    trailerURL: {
        type: String,
        required: true
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

module.exports = mongoose.model("seasons", schema);
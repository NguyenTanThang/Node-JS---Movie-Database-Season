const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    videoID: {
        type: String,
        required: true
    },
    languageLabel: {
        type: String,
        required: true
    },
    subtitleURL: {
        type: String,
        required: true
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

module.exports = mongoose.model("subtitles", schema);
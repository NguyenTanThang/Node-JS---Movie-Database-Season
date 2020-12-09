const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    movieID: {
        type: String,
    },
    seriesID: {
        type: String,
    },
    customerID: {
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

module.exports = mongoose.model("watch-history", schema);
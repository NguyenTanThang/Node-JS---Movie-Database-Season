const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    movieID: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    }, 
    grading: {
        type: Number,
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

module.exports = mongoose.model("reviews", schema);
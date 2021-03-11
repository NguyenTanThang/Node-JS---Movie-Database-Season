const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    customerID: {
        type: Schema.ObjectId, 
        ref: 'customers',
        required: true
    },
    movieSeriesID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
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

module.exports = mongoose.model("comments", schema);
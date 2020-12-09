const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    movieID: {
        type: Schema.ObjectId,
        ref: "movies"
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

module.exports = mongoose.model("watch-laters", schema);
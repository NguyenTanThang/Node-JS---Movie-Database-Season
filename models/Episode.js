const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    seasonID: {
        type: Schema.ObjectId, 
        ref: 'series',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    episodeURL: {
        type: String,
        required: true
    },
    episodeNum: {
        type: Number,
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

module.exports = mongoose.model("episodes", schema);
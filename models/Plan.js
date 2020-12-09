const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        unique: true
    },
    priceVND: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    durationInDays: {
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

module.exports = mongoose.model("plans", schema);
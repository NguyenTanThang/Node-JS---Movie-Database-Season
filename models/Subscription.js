const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    customerID: {
        type: String,
        required: true,
        ref: "customers"
    },
    planID: {
        type: String,
        required: true,
        ref: "plans"
    },
    started_date: {
        type: Date,
        default: Date.now()
    },
    ended_date: {
        type: Date,
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

module.exports = mongoose.model("subscriptions", schema);
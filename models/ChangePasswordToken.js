const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    customerID: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
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

module.exports = mongoose.model("change-password-tokens", schema);
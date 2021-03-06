const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    customerID: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    planID: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: ""
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

module.exports = mongoose.model("paypal-payments", schema);
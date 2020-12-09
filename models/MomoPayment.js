const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    requestId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true,
    },
    planID: {
        type: String,
        required: true,
    },
    message: {
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

module.exports = mongoose.model("momo-payments", schema);
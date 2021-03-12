const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    stripeCustomerID: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        default: "Username"
    },
    avatar: {
        type: String,
        default: "https://i.imgur.com/iG9kAgD.png"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    validated: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model("customers", schema);
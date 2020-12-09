const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model("manager-roles", schema);
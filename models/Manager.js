const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    roleID: {
        type: Schema.ObjectId, 
        ref: 'manager-roles',
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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

module.exports = mongoose.model("managers", schema);
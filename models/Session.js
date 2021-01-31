const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    customerID: {
        type: Schema.ObjectId, 
        ref: 'customers',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiry_date: {
        type: Date,
        default: new Date(Date.now() + 300000)
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("sessions", schema);
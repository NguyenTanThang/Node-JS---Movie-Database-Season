const ManagerRole = require("../models/ManagerRole");
var {connectDBWithURI} = require("../config/db");
const MONGODB_URI = `mongodb+srv://fatman:123456a@blog.yrv4b.mongodb.net/movie-database-season?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

const roles = [
    {
        role: "admin"
    },
    {
        role: "staff"
    },
]

let counter = 0;

const seed = async () => {
    const conn = connectDBWithURI(MONGODB_URI);

    roles.forEach(async role => {
        await new ManagerRole(role).save();
        counter++;
        if (counter === roles.length) {
            mongoose.connection.close();
        }
    })
}

seed();
const Genre = require("../models/Genre");
var {connectDBWithURI} = require("../config/db");
const MONGODB_URI = `mongodb+srv://fatman:123456a@blog.yrv4b.mongodb.net/movie-database-season?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

const genres = [{
        name: "Absurdist"
    },
    {
        name: "Action"
    },
    {
        name: "Adventure"
    },
    {
        name: "Animation"
    },
    {
        name: "Comedy"
    },
    {
        name: "Crime"
    },
    {
        name: "Drama"
    },
    {
        name: "Fantasy"
    },
    {
        name: "Historical"
    },
    {
        name: "Historical Fiction"
    },
    {
        name: "Horror"
    },
    {
        name: "Magical Realism"
    },
    {
        name: "Paranoid Fiction"
    },
    {
        name: "Philosophical"
    },
    {
        name: "Political"
    },
    {
        name: "Romance"
    },
    {
        name: "Saga"
    },
    {
        name: "Satire"
    },
    {
        name: "Science Fiction"
    },
    {
        name: "Social"
    },
    {
        name: "Speculative"
    },
    {
        name: "Thriller"
    },
    {
        name: "Urban"
    },
    {
        name: "Western"
    }
]

let counter = 0;

const seed = async () => {
    const conn = connectDBWithURI(MONGODB_URI);

    genres.forEach(async genre => {
        await new Genre(genre).save();
        counter++;
        if (counter === genres.length) {
            mongoose.connection.close();
        }
    })
}

seed();
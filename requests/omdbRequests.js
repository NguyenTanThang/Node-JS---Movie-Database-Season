const {getOMDBURL} = require("../config/config");
const axios = require('axios');

const getOMDBMovie = async (IMDB_ID) => {
    const res = await axios.get(getOMDBURL(IMDB_ID));

    return res.data;
}

module.exports = {
    getOMDBMovie
}
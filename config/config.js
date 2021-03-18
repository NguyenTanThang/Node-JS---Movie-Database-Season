const STRIPE_API_KEY = `sk_test_ETJsviO2O5GerqT9HQ5Tsw9a00f0qbPheK`;
const MONGODB_URI = `mongodb+srv://test:123456a@tanthang.b7rfb.mongodb.net/test-movies?retryWrites=true&w=majority`;
const CURRENT_URL = `https://node-js-movie-database-season.herokuapp.com`;
//const CURRENT_URL = `http://localhost:5000`;

const CURRENT_CLIENT_URL = `https://lets-flix-client.netlify.app/`

const getOMDBURL = (IMDB_ID) => {
    return `https://www.omdbapi.com/?i=${IMDB_ID}&apikey=a8ef1841`
}

module.exports = {
    STRIPE_API_KEY,
    MONGODB_URI,
    CURRENT_URL,
    CURRENT_CLIENT_URL,
    getOMDBURL
}
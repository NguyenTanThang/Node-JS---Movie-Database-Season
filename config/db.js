const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`Database is running on ${conn.connection.host}:${conn.connection.port}`);

        return conn;
    } catch (error) {
        console.log(error);
    }
}

const connectDBWithURI = async (URI) => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`Database is running on ${conn.connection.host}:${conn.connection.port}`);

        return conn;
    } catch (error) {
        console.log(error);
    }
}

const connectDBWithURISync = (URI) => {
    const conn = mongoose.createConnection(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    conn.once('open', () => {
        console.log(`Database is running on ${conn.connection.host}:${conn.connection.port}`);
    })

    return conn;
}

module.exports = {
    connectDB,
    connectDBWithURI,
    connectDBWithURISync
}
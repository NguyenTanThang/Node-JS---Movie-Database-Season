const Session = require("../models/Session");
const A_OR_AN = "a";
const APP_NAME = "session";
const {
    removeAllExpiredSession
} = require("../requests/sessionRequests");

const getAllSessions = async (req, res) => {
    try {
        await removeAllExpiredSession();

        const sessions = await Session.find();

        res.json({
            success: true,
            data: sessions,
            length: sessions.length,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const getSessionByID = async (req, res) => {
    try {
        await removeAllExpiredSession();

        const {sessionID} = req.params;
        const session = await Session.findById(sessionID);

        if (!session) {
            res.json({
                success: true,
                data: null,
                message: `Session does not exist`,
                status: 200
            })
        }

        res.json({
            success: true,
            data: session,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const refreshSession = async (req, res) => {
    try {
        const {sessionID} = req.params;

        let session = await Session.findById(sessionID);

        if (!session) {
            res.json({
                success: true,
                data: null,
                message: `Session does not exist`,
                status: 200
            })
        }

        session = await Session.findByIdAndUpdate(sessionID, {
            expiry_date: new Date(Date.now() + 300000)
            //expiry_date: new Date(Date.now() + 60 * 1000 * 2),
        });

        res.json({
            success: true,
            data: session,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

const deleteSession = async (req, res) => {
    try {
        const {sessionID} = req.params;
        let session = await Session.findById(sessionID);

        if (!session) {
            res.json({
                success: true,
                data: null,
                message: `Session does not exist`,
                status: 200
            })
        }

        const deletedSession = await Session.findByIdAndDelete(sessionID);

        return res.json({
            success: true,
            data: deletedSession,
            status: 200
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            data: null,
            message: `Internal Server Error`,
            status: 500
        })
    }
}

module.exports = {
    getAllSessions,
    getSessionByID,
    refreshSession,
    deleteSession
}
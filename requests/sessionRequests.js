const Session = require("../models/Session");

const createSession = async (token, customerID) => {
    try {
        await removeAllExpiredSession();
        const session = await new Session({
            token, customerID,
            expiry_date: new Date(Date.now() + 300000),
            //expiry_date: new Date(Date.now() + 60 * 1000 * 2),
            created_date: Date.now()
        }).save();
        
        return session;
    } catch (error) {
        console.log(error);
    }
}

const getAllSessionsByCustomerID = async (customerID) => {
    try {
        const sessions = await Session.find({customerID});
        
        return sessions;
    } catch (error) {
        console.log(error);
    }
}

const removeAllExpiredSession = async () => {
    try {
        let sessions = await Session.find();
        let expiredSessions = [];
        
        for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i];
            if (+session.expiry_date < +Date.now()) {
                await Session.findByIdAndDelete(session._id)
                expiredSessions.push(session);
            }
        }
        
        return expiredSessions;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createSession,
    removeAllExpiredSession,
    getAllSessionsByCustomerID
}

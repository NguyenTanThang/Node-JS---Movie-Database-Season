require('dotenv').config();
const jwt = require("jsonwebtoken");
const Manager = require("../models/Manager");

const createToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) 
        return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) 
            return res.json({
                status: 403,
                success: false,
                data: null,
                message: `Forbidden`
            })
        req.user = user
        next()
    })
}

const allowAdmin = (req, res, next) => {
    const user = req.user;
    Manager.findById(user._id)
    .populate("roleID")
    .exec()
    .then((userDoc) => {
        if (!userDoc) return res.json({
            status: 401,
            success: false,
            data: null,
            message: `Unauthorized Access`
        })
        console.log(userDoc)
        if (userDoc.roleID.role != "admin") return res.json({
            status: 403,
            success: false,
            data: null,
            message: `Forbidden`
        })
        next();
    })
}

module.exports = {
    authenticateToken,
    createToken,
    allowAdmin
}
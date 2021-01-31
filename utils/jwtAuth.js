const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader;
    if (token == null) 
        return res.json({
            success: false,
            message: "Unauthorized",
            status: 401
        })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)
        console.log(user)
        if (err)
            return res.json({
                success: false,
                message: "Forbidden",
                status: 403
            })
        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken
}
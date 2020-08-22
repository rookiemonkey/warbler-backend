const jwt = require("jsonwebtoken")

async function isLoggedIn(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]

        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) { return next({ status: 401, message: "Please login first" }) }

        return next()
    }
    catch (err) {

        return next({ status: 401, message: "Please login first" })

    }

};

module.exports = isLoggedIn;
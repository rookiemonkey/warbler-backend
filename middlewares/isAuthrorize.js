const jwt = require("jsonwebtoken")

async function isAuthorize(req, res, next) {
    try {

        // get the token from the req.headers, same with isLogin
        const token = req.headers.authorization.split(" ")[1]

        // verify the token taken from the req.headers
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)

        // compare decoded.id and the id in parameter
        if (decoded && decoded._id == req.params.id) { next() }
        else { next({ status: 401, message: "Unauthorized" }) }

    }

    catch (err) {

        return next({ status: 401, message: "Unauthorized" })

    }

}

module.exports = isAuthorize;
require("dotenv").config();
const jwt = require("jsonwebtoken")

function isLogin(req, res, next) {
    try {
        // get the token from the req.headers
        // it is on the authorization option formated like below:
        // bearer<space>jwtToken = hence we will split via space
        // then we will get the 2nd element [1] which is the jwtToken
        const token = req.headers.authorization.split(" ")[1]

        // verify the token taken from the req.headers
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
            (decoded) // check if token matches
            ? next() // true? next middleware
            : next({status: 401, message: "Please login first"}) // else error
        })
    }
    catch(err) {

        return next({status: 401, message: "Please login first"})

    }

};

module.exports = isLogin;
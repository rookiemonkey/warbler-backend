require("dotenv").config();
const jwt = require("jsonwebtoken")

function isAuthorize(req, res, next) {
    try {

         // get the token from the req.headers, same with isLogin
        const token = req.headers.authorization.split(" ")[1]

        // verify the token taken from the req.headers
        jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded){

            try {

                // compare decoded.id and the id in parameter
                if (decoded && decoded.id == req.params.id) { next() }
                else { next({ status: 401, message: "Unauthorized" }) }

            }

            catch (err) {

                return next({ status: 401, message: "Unauthorized" })

            }

        })
    }

    catch (err) {

        return next({ status: 401, message: "Unauthorized" })

    }

}

module.exports = isAuthorize;
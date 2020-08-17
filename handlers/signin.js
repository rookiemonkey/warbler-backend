const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isMatch = async (user, pw) => {
    // invoked the method for user model
    return await user.comparePassword(pw, user.password);
}

const signin = async (req, res, next) => {
    try {

        // find the user on the database
        const foundUser = await User.findOne({ email: req.body.email })

        // compare the currentuser and the password from the form returns a boolean
        const match = await isMatch(foundUser, req.body.password)

        if (match) {

            // destructuring the keys
            const { _id, username, profilePicture, accountCreation, email } = foundUser
            const payload = { _id, username, profilePicture, accountCreation, email }

            // creating a token
            const token = await jwt.sign(payload, process.env.SECRET_KEY)

            // return the foundUser along with the token
            return res
                .status(200)
                .json({ ...payload, token })
        }

        else {

            // if false
            return res.json({
                status: 400,
                message: "Invalid username/password. Please try again"
            })
        }

    }

    catch (err) {

        // pass the error to error.js handler
        return next(err)

    }
}

module.exports = signin
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { json } = require("body-parser");

const isMatch = async (user, pw) => {
    // invoked the method for user model
    return await user.comparePassword(pw, user.password);
}

exports.signin = async (req, res, next) => {

    try {

        // find the user on the database
        const foundUser = await db.User.findOne({ email: req.body.email })

        // compare the currentuser and the password from the form returns a boolean
        const match = await isMatch(foundUser, req.body.password)


        if (match) {

            // destructuring the keys
            const { id, username, profilePicture, accountCreation, email } = foundUser

            // creating a token
            const token = jwt.sign({
                id,
                username,
                profilePicture,
                accountCreation,
                email
            }, process.env.SECRET_KEY)

            // return the foundUser along with the token
            return res.status(200).json({
                token,
                id,
                username,
                profilePicture,
                accountCreation,
                email
            })
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


exports.signup = async (req, res, next) => {
    try {

        // create the user
        await User.create(req.body)

            .then((newUser => {

                // destructuring
                const { id, username, profilePicture, accountCreation, email } = newUser

                // create a token
                const token = jwt.sign({
                    id,
                    username,
                    profilePicture,
                    accountCreation,
                    email
                }, process.env.SECRET_KEY)

                // return a promise object containing all the info
                return { id, username, profilePicture, accountCreation, email, token }
            }))

            .then(newUser => {

                // destructuring
                const { id, username, profilePicture, accountCreation, email, password, token } = newUser

                // return the newly created user alongwith status code and token
                return res.status(201).json({
                    id,
                    username,
                    profilePicture,
                    accountCreation,
                    email,
                    password,
                    token
                })
            })
    }
    catch (err) {

        if (err.name == "MongoError") {

            // pass the error to error.js handler
            next({
                status: 400,
                message: "Username/Email is already taken, Consider using a different username or email"
            })

        } else {

            // pass the error to error.js handler
            next({
                status: 400,
                message: err.message
            })

        }
    }
}

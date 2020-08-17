const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require('multer');
const cloudinary = require('cloudinary');
const setMulter = require("../helpers/setMulter");
const setCloudinary = require("../helpers/setCloudinary");
const upload = setMulter(multer);
cloudinary.config(setCloudinary());

const signup = async (req, res, next) => {
    try {

        // create the user
        const newUser = await User.create(req.body)

        // destructuring
        const { _id, username, profilePicture, accountCreation, email } = newUser
        const payload = { _id, username, profilePicture, accountCreation, email }

        // create a token
        const token = await jwt.sign(payload, process.env.SECRET_KEY)

        // return the newly created user alongwith status code and token
        return res
            .status(201)
            .json({ ...payload, token })

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

module.exports = signup
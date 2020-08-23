const cloudinary = require('cloudinary');
const isEmail = require('validator/lib/isEmail')
const User = require("../models/user");
const setToken = require('../helpers/setToken');
const toUpload = require('../helpers/toUpload')
cloudinary.config(require("../helpers/setCloudinary")());

const signup = async (req, res, next) => {
    try {

        // check valid inputs
        const validInputs = ['username', 'email', 'password', 'profilePicture']
        const areInputsValid = Object.keys(req.body).every(bodyInput => {
            return validInputs.includes(bodyInput)
        })
        if (!areInputsValid) { throw new Error("Invalid fields provided") }

        // is email valid?
        const isEmailValid = isEmail(req.body.email)
        if (!isEmailValid) { throw new Error('Please provide a valid email address') }

        // upload profilePicture, fallback to default
        let avatar = await toUpload(cloudinary, req);
        if (!avatar) { avatar = 'https://res.cloudinary.com/promises/image/upload/v1596613153/global_default_image.png' }
        req.body.profilePicture = avatar

        // create the user
        const createdUser = await User.create(req.body)

        // destructuring
        const { _id, username, profilePicture, createdAt, updatedAt, email } = createdUser
        const payload = { _id, username, profilePicture, createdAt, updatedAt, email }

        // create a token
        const token = await setToken(payload)

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
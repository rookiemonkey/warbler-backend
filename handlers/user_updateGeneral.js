const isEmail = require('validator/lib/isEmail')
const User = require('../models/user');

// POST - /api/user/:id/general
const updateGeneral = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // is email valid?
        const isEmailValid = isEmail(req.body.email)
        if (!isEmailValid) {
            throw new Error('Please provide a valid email address')
        }

        // save the inputs
        foundUser.username = req.body.username;
        foundUser.email = req.body.email
        await foundUser.save();

        // respond back to the client
        return res
            .status(200)
            .json({
                result: "successfully updated your accounts's general informations",
            })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateGeneral;
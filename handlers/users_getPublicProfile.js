const User = require("../models/user");

// GET - /api/users/:id
const getPublicProfile = async (req, res, next) => {
    try {

        // find the user on the database
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        const { profilePicture, username, accountCreation, email, bio } = foundUser;

        // return the foundUser
        return res
            .status(200)
            .json({ profilePicture, username, accountCreation, email, bio })

    }

    catch (err) {

        // pass the error to error.js handler
        return next(err)

    }
}

module.exports = getPublicProfile
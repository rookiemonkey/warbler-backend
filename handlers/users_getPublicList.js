const User = require("../models/user");

// GET - /api/users/list
const getPublicList = async (req, res, next) => {
    try {

        // look for at least 6 users
        const foundUsers = await User
            .find({})
            .limit(6)
            .select('_id username profilePicture')

        // return the foundUser
        return res
            .status(200)
            .json({ discoverPeople: foundUsers })

    }

    catch (err) {

        // pass the error to error.js handler
        return next(err)

    }
}

module.exports = getPublicList
const sanitizer = require('sanitizer');
const User = require('../models/user');

// POST - /api/users/bio
const updateBio = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.userid)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // save the bio
        foundUser.bio = sanitizer.escape(req.body.bio)
        await foundUser.save();

        // respond back to the client
        return res
            .status(200)
            .json({
                result: "successfully updated your bio",
                bio: foundUser.bio
            })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateBio;
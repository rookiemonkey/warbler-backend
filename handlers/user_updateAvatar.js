const cloudinary = require('cloudinary');
const User = require('../models/user');
const toUpload = require('../helpers/toUpload')
cloudinary.config(require("../helpers/setCloudinary")());

// POST - /api/user/:id/avatar
const updateAvatar = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // save the bio
        foundUser.profilePicture = await toUpload(cloudinary, req);
        foundUser.save();

        // respond back to the client
        return res
            .status(200)
            .json({
                result: "successfully updated your profile picture",
                profilePicture: foundUser.profilePicture
            })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateAvatar;
const cloudinary = require('cloudinary');
const User = require('../models/user');
const toUpload = require('../helpers/toUpload')
cloudinary.config(require("../helpers/setCloudinary")());

// POST - /api/user/:id/header
const updateHeader = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // save the profileHeader
        foundUser.profileHeader = await toUpload(cloudinary, req);
        foundUser.save();

        // respond back to the client
        return res
            .status(200)
            .json({
                result: "successfully updated your profile header",
                profileHeader: foundUser.profileHeader
            })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateHeader;
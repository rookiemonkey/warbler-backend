const User = require('../models/user');

// POST - /api/user/:id/authentication
const updateAuthentication = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // are passwords a match
        const { password, confirmPassword } = req.body;
        if (confirmPassword !== password) {
            throw new Error("Passwords doesn't match")
        }

        foundUser.password = password;
        await foundUser.save();

        // respond back to the client
        return res
            .status(200)
            .json({
                result: "successfully updated your accounts's auth informations",
            })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateAuthentication;
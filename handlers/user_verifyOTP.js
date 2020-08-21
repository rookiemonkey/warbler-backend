const jwt = require("jsonwebtoken")
const Speakeasy = require("speakeasy");
const User = require('../models/user')

const verifyOTP = async (req, res) => {

    try {
        const foundUser = await User.findOne({ email: req.body.email })

        const isVerified = Speakeasy.totp.verify({
            secret: foundUser.OTPkey,
            token: req.body.token,
            encoding: "base32",
            window: 0
        })

        if (!isVerified) {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" })
        }

        const { _id, username, profilePicture, accountCreation, email } = foundUser
        const payload = { _id, username, profilePicture, accountCreation, email }

        const token = await jwt.sign(payload, process.env.SECRET_KEY)

        return res
            .status(200)
            .json({ ...payload, token })
    }

    catch (err) {

        next(err)

    }
}

module.exports = verifyOTP
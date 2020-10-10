const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
const User = require('../models/user')
const setToken = require('../helpers/setToken');

const verifyOTP = async (req, res, next) => {

    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) { throw new Error("User doesn't exists") }
        if (!foundUser.OTP) { throw new Error("Account OTP is not enabled") }
        if (!req.body.token) { throw new Error("Please provide a valid token") }

        const isVerified = Speakeasy.totp.verify({
            secret: cryptr.decrypt(foundUser.OTPkey),
            token: req.body.token,
            encoding: "base32",
            window: 0
        })

        if (!isVerified) {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" })
        }

        const { _id, username, profilePicture, createdAt, email, bio } = foundUser
        const payload = { _id, username, profilePicture, createdAt, email, bio }

        const token = await setToken(payload)

        return res
            .status(200)
            .json({ ...payload, token })
    }

    catch (err) {

        next(err)

    }
}

module.exports = verifyOTP
const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
const User = require('../models/user')

const toggleOTP = async (req, res) => {

    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) { throw new Error("User doesn't exists") }

        foundUser.OTP = !foundUser.OTP

        if (!foundUser.OTP) {
            foundUser.OTPkey = ''
            await foundUser.save()
            return res
                .status(201)
                .json({ message: "Successfully turned off OTP" })
        }

        const secret = Speakeasy.generateSecret({ length: 20 })
        foundUser.OTPkey = cryptr.encrypt(secret.base32);
        await foundUser.save()
        return res
            .status(201)
            .json({ message: "Successfully turned on OTP" })
    }

    catch (err) {

        return next(err)

    }
}

module.exports = toggleOTP
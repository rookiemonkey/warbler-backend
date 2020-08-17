const User = require('../models/user')

const toggleOTP = async (req, res) => {

    try {
        const foundUser = await User.findById(req.params.id)

        foundUser.OTP = !foundUser.OTP

        if (!foundUser.OTP) {
            return res
                .status(201)
                .json({ message: "Successfully turned off OTP" })
        }

        const secret = Speakeasy.generateSecret({ length: 20 })
        foundUser.OTPkey = secret.base32
        await foundUser.save()
    }

    catch (err) {

        return next(err)

    }
}

module.exports = toggleOTP
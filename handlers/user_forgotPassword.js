const async = require('async');
const crypto = require('crypto');
const toEmail = require('../helpers/toEmail')
const setPasswordResetToken = require('../helpers/setPasswordResetToken')
const User = require('../models/user')

const forgotPassword = async (req, res, next) => {

    async.waterfall([
        async function () {
            const foundUser = await User.findOne({ email: req.body.email })
            if (!foundUser) {
                next({ status: 400, message: "User doesn't exists" })
                throw new Error()
            }

            if (foundUser.OTP) {
                next({ status: 400, message: "Password reset is not applicable for accounts with OTP as their login" })
                throw new Error()
            }

            return foundUser
        },

        async function (foundUser) {
            const buffer = crypto.randomBytes(20)
            const token = buffer.toString('hex');
            const updatedUser = await setPasswordResetToken(foundUser, token)
            return { updatedUser, token }
        },

        async function (data) {
            await toEmail(
                data.updatedUser.email,
                `Warbler Password Reset`,
                `You received this email becuase your requested for a password reset for your Yelpcamp account. Please click the link below or paste it on your browser to proceed in resetting your password

                http://${req.headers.host}/api/auth/password/reset/${data.token}

                If you did not request this, please disregard this email and we will not change your password, Also, report it to us immediately so we can take further action regarding the security of your account.`
            )
            return true;
        }
    ],

        // optional callback after waterfall
        (isThereError) => {

            // explicitly true since {} and error{} is also true
            if (!isThereError) {
                return res
                    .status(200)
                    .json({ message: "Successfully sent a password reset link to your email" })
            }

        });

}

module.exports = forgotPassword
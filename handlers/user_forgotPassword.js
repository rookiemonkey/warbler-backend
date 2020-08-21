const async = require('async');
const crypto = require('crypto');
const setPasswordResetToken = require('../helpers/setPasswordResetToken')
const User = require('../models/user')

const forgotPassword = async (req, res, next) => {

    async.waterfall([
        function (done) {
            const buffer = crypto.randomBytes(20)
            const token = buffer.toString('hex');
            done(null, token);
        },

        async function (token, done) {
            const foundUser = await User.findOne({ email: req.body.email })
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ status: 400, message: "User doesn't exists" })
            }

            await setPasswordResetToken(foundUser, token)
            done(null, foundUser, token)
        },

        async function (foundUser, token, done) {
            await toEmail(
                foundUser.email,
                `Warbler Password Reset`,
                `You received this email becuase your requested for a password reset for your Yelpcamp account. Please click the link below or paste it on your browser to proceed in resetting your password

                http://${req.headers.host}/reset_password/${token}

                If you did not request this, please disregard this email and we will not change your password, Also, report it to us immediately so we can take further action regarding the security of your account.`
            )
            done();
        }
    ], () => {
        return res
            .status(201)
            .json({ message: "Successfully sent a password reset link to your email" })
    });
}

module.exports = forgotPassword
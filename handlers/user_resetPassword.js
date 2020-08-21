const async = require('async');
const toResetPassword = require('../helpers/toResetPassword');
const toEmail = require('../helpers/toEmail');
const User = require('../models/user')

const resetPassword = (req, res) => {
    async.waterfall([
        async function (done) {
            const foundUser = await User.findOne({ resetPasswordToken: req.params.token })
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Token is expired" })
            }

            if (req.body.newPassword !== req.body.confirmPassword) {
                return res
                    .status(400)
                    .json({ status: 400, message: "Passwords do not match" })
            }

            await toResetPassword(foundUser, req.body.newPassword);
            done(null, foundUser)
        },
        async function (foundUser, done) {
            await toEmail(
                foundUser.email,
                `Warbler Password Reset Success`,
                `We successfully reset your Warbler Account password with the following details

                         USERNAME: ${foundUser.username}
                         EMAIL: ${foundUser.email}

                 Have a good day!`
            );
            return res
                .status(200)
                .json({
                    status: 200,
                    message: "Successfully updated your password. Please login"
                })
        }
    ])
}

module.exports = resetPassword;
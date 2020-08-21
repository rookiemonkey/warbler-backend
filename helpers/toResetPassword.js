const toResetPassword = async (user, newPW) => {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.password = newPW;
    await user.save(); // pre-hook to hash password
};

module.exports = toResetPassword;
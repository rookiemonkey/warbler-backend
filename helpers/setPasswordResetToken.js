const setToken = async (user, token) => {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000 // 1hr
    return await user.save();
}

module.exports = setToken;
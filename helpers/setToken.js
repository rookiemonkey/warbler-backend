const jwt = require("jsonwebtoken")

const setToken = async payload => {
    return await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2 days' })
}

module.exports = setToken
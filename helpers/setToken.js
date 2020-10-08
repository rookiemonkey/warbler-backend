const jwt = require("jsonwebtoken")

const setToken = async payload => {
    return await jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '2 days' })
}

module.exports = setToken
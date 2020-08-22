const jwt = require("jsonwebtoken")

function isApplicable(req, res, next) {
    if (!req.headers.authorization) { return next() }

    return next({ status: 401, message: "You are already logged in and has an account" })
};

module.exports = isApplicable;
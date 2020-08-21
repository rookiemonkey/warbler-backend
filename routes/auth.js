const express = require("express");
const router = express();
const signin = require('../handlers/signin')
const signup = require('../handlers/signup')
const toggleOTP = require('../handlers/user_toggleOTP')
const verifyOTP = require('../handlers/user_verifyOTP')
const forgotPassword = require('../handlers/user_forgotPassword')

// prefix - /api/auth
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signin/otp", verifyOTP)
router.post("/toggle/otp", toggleOTP)
router.post("/forgot_password", forgotPassword)

module.exports = router;
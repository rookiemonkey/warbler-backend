const express = require("express");
const router = express();
const signin = require('../handlers/signin')
const signup = require('../handlers/signup')
const toggleOTP = require('../handlers/user_toggleOTP')
const verifyOTP = require('../handlers/user_verifyOTP')
const forgotPassword = require('../handlers/user_forgotPassword')
const resetPassword = require('../handlers/user_resetPassword')

const multer = require('multer');
const setMulter = require("../helpers/setMulter");
const upload = setMulter(multer);

// prefix - /api/auth
router.post("/signup", upload.single('profilePicture'), signup)
router.post("/signin", signin)
router.post("/signin/otp", verifyOTP)
router.post("/toggle/otp", toggleOTP)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password", resetPassword)

module.exports = router;
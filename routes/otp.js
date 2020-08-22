const router = require("express")();
const isApplicable = require("../middlewares/isApplicable");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAuthorize = require("../middlewares/isAuthrorize");
const toggleOTP = require('../handlers/user_toggleOTP')
const verifyOTP = require('../handlers/user_verifyOTP')

// prefix - /api/auth/otp
router.post("/signin", isApplicable, verifyOTP)
router.post("/toggle", isLoggedIn, isAuthorize, toggleOTP)

module.exports = router
const router = require("express")();
const forgotPassword = require('../handlers/user_forgotPassword')
const resetPassword = require('../handlers/user_resetPassword')

// prefix - /api/auth/password
router.post("/forgot", forgotPassword)
router.post("/reset/:token", resetPassword)

module.exports = router
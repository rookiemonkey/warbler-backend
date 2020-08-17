const express = require("express");
const router = express();
const signin = require('../handlers/signin')
const signup = require('../handlers/signup')
const toggleOTP = require('../handlers/user_toggleOTP')

// prefix - /api/auth
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/toggleOTP", toggleOTP)

module.exports = router;
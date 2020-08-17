const express = require("express");
const router = express();
const signin = require('../handlers/signin')
const signup = require('../handlers/signup')

// prefix - /api/auth
router.post("/signup", signup)
router.post("/signin", signin)

module.exports = router;
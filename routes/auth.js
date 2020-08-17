const express = require("express");
const router = express();
const {signup, signin} = require("../handlers/auth")

// prefix - /api/auth
router.post("/signup", signup)
router.post("/signin", signin)

module.exports = router;
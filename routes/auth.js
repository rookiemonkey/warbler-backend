const express = require("express");
const router = express();
const signin = require('../handlers/signin')
const signup = require('../handlers/signup')

const multer = require('multer');
const setMulter = require("../helpers/setMulter");
const upload = setMulter(multer);

// prefix - /api/auth
router.post("/signup", upload.single('profilePicture'), signup)
router.post("/signin", signin)


module.exports = router;
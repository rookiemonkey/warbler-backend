const express = require("express")
const router = express.Router({ mergeParams: true });
const updateBio = require('../handlers/user_updateBio');
const updateAvatar = require('../handlers/user_updateAvatar');

const multer = require('multer');
const setMulter = require("../helpers/setMulter");
const upload = setMulter(multer);

// prefix - /api/users
router
    .put("/bio", updateBio)
    .put("/avatar", upload.single('profilePicture'), updateAvatar)


module.exports = router;
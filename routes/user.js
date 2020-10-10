const express = require("express")
const router = express.Router({ mergeParams: true });
const updateBio = require('../handlers/user_updateBio');
const updateAvatar = require('../handlers/user_updateAvatar');
const updateGeneral = require('../handlers/user_updateGeneral');
const updateAuthentication = require('../handlers/user_updateAuthentication');

const multer = require('multer');
const setMulter = require("../helpers/setMulter");
const upload = setMulter(multer);

// prefix - /api/users/:id
router
    .put("/bio", updateBio)
    .put("/avatar", upload.single('profilePicture'), updateAvatar)
    .put("/general", updateGeneral)
    .put("/authentication", updateAuthentication)


module.exports = router;
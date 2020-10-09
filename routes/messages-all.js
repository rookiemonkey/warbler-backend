const express = require("express");
const router = express.Router({ mergeParams: true })
const getMsgAll = require('../handlers/message_readAll')
const getMsgAllOfUser = require('../handlers/message_readAllOfUser');
const isLoggedIn = require("../middlewares/isLoggedIn");

// prefix - /api/message/all"
router.route("/")
    .get(getMsgAll)

router.route("/:userid")
    .get(isLoggedIn, getMsgAllOfUser)

module.exports = router
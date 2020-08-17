const express = require("express");
const router = express.Router({ mergeParams: true })
const getMsgAll = require('../handlers/message_readAll')

router.route("/")
    .get(getMsgAll)

module.exports = router
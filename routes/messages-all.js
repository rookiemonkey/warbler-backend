const express = require("express");
const router = express.Router({ mergeParams: true })
const getMsgAll = require('../handlers/message_readAll')

// prefix - /api/message/all"
router.route("/")
    .get(getMsgAll)

module.exports = router
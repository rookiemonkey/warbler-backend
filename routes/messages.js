const express = require("express");
const router = express.Router({ mergeParams: true })
const getMsg = require('../handlers/message_read')
const createMsg = require('../handlers/message_create')
const deleteMsg = require('../handlers/message_delete')

// prefix - /api/message/:id
router.route("/new")
    .post(createMsg)

// prefix - /api/message/:id"
router.route("/:message_id")
    .get(getMsg)
    .delete(deleteMsg)

module.exports = router
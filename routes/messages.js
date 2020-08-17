const express = require("express");
const router = express.Router({mergeParams: true})
const {createMsg, getMsg, deleteMsg} = require("../handlers/messages");

// prefix - /api/users/:id/message
router.route("/")
    .post(createMsg)

// prefix - api/users/:id/message/:message_id
router.route("/:message_id")
    .get(getMsg)
    .delete(deleteMsg)

module.exports = router
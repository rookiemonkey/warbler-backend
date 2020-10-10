const express = require("express")
const router = express.Router({ mergeParams: true });
const getPublicProfile = require('../handlers/users_getPublicProfile');

// prefix - /api/users/:id
router.get('/', getPublicProfile)


module.exports = router;
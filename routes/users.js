const express = require("express")
const router = express.Router({ mergeParams: true });
const getPublicProfile = require('../handlers/users_getPublicProfile');
const getPublicList = require('../handlers/users_getPublicList');

// prefix - /api/users
router
    .get('/list', getPublicList)
    .get('/:id', getPublicProfile)

module.exports = router;
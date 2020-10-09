const express = require("express");
const router = express.Router({ mergeParams: true })
const localNews = require('../handlers/news_local');
const globalNews = require('../handlers/news_global');
const categoricalNews = require('../handlers/news_categories');

// prefix - /api/news
router.route("/local")
    .get(localNews)

router.route("/global")
    .get(globalNews)

router.route("/categories")
    .get(categoricalNews)

module.exports = router
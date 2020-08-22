// ==========================
// DEPENDENCIES
// ==========================
require("dotenv").config();
require("./models");
const PORT = process.env.PORT || 8081;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))




// ==========================
// ROUTES
// ==========================
const authRoutes = require("./routes/auth");
const msgRoutes = require("./routes/messages");
const msgRoutesAll = require("./routes/messages-all");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAuthorize = require("./middlewares/isAuthrorize");

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// /api/auth is a prefix followed by the route on authRoutes
app.use("/api/auth", authRoutes)
app.use("/api/auth/:id/message", isLoggedIn, isAuthorize, msgRoutes)
app.use("/api/messages", isLoggedIn, msgRoutesAll)



// ==========================
// ERROR HANDLERS
// ==========================
const handleError = require('./handlers/error');
app.use(handleError) // handles all the error




// ==========================
// SERVER
// ==========================
app.listen(PORT, () => {
    console.log(`SERVER STARTED AT http://localhost:${PORT}. TIMESTAMP: ${Date()}`)
})
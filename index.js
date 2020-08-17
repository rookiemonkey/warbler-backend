// ==========================
// DEPENDENCIES
// ==========================
require("dotenv").config();
const PORT = process.env.PORT || 8081;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




// ==========================
// ROUTES
// ==========================
const authRoutes = require("./routes/auth");
const msgRoutes = require("./routes/messages");
const msgRoutesAll = require("./routes/messages-all");
const isLogin = require("./middlewares/isLogin");
const isAuthorize = require("./middlewares/isAuthrorize");

app.all('/', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
next()
});

// /api/auth is a prefix followed by the route on authRoutes
app.use("/api/auth", authRoutes)
app.use("/api/auth/:id/message", isLogin, isAuthorize, msgRoutes)
app.use("/api/messages", isLogin, msgRoutesAll)



// ==========================
// ERROR HANDLERS
// ==========================
const handleError = require('./handlers/error');
app.use(function (req, res, next) {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
    // error obj will be passed to the next middleware
})

app.use(handleError) // handles all the error




// ==========================
// SERVER
// ==========================
app.listen(PORT, () => {
    console.log(`SERVER STARTED AT http://localhost:${PORT}. TIMESTAMP: ${Date()}`)
})
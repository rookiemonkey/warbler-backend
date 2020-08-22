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
const otpRoutes = require('./routes/otp');
const passwordRoutes = require('./routes/password');
const msgRoutes = require("./routes/messages");
const msgRoutesAll = require("./routes/messages-all");
const isApplicable = require("./middlewares/isApplicable");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAuthorize = require("./middlewares/isAuthrorize");

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// /api/auth is a prefix followed by the route on authRoutes
app.use("/api/auth/otp", otpRoutes)
app.use("/api/auth/password", isApplicable, passwordRoutes)
app.use("/api/auth", isApplicable, authRoutes)
app.use("/api/message/all", isLoggedIn, msgRoutesAll)
app.use("/api/message/:id", isLoggedIn, isAuthorize, msgRoutes)



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
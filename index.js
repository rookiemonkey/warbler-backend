// ==========================
// DEPENDENCIES
// ==========================
require("dotenv").config();
require("./models");
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

const limiter = rateLimit({
    windowMs: 7 * 60 * 1000, // 7 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(limiter);







// ==========================
// ROUTES
// ==========================
const authRoutes = require("./routes/auth");
const otpRoutes = require('./routes/otp');
const passwordRoutes = require('./routes/password');
const userRoutes = require('./routes/user');
const msgRoutes = require("./routes/messages");
const msgRoutesAll = require("./routes/messages-all");
const newsRoutes = require("./routes/news");
const isApplicable = require("./middlewares/isApplicable");
const isLoggedIn = require("./middlewares/isLoggedIn");
const isAuthorize = require("./middlewares/isAuthrorize");

// /api/auth is a prefix followed by the route on authRoutes
app.use("/api/auth/otp", otpRoutes)
app.use("/api/auth/password", isApplicable, passwordRoutes)
app.use("/api/auth", isApplicable, authRoutes)
app.use("/api/users/:userid", isLoggedIn, isAuthorize, userRoutes)
app.use("/api/message/all", msgRoutesAll)
app.use("/api/message/:id", isLoggedIn, isAuthorize, msgRoutes)
app.use("/api/news", newsRoutes)


// ==========================
// ERROR HANDLERS
// ==========================
const handleError = require('./handlers/error');
app.use(handleError) // handles all the error




// ==========================
// SERVER
// ==========================
const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Warbler listening at http://${host}:${port}`);
})
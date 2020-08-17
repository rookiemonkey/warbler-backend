const mongoose = require("mongoose")
mongoose.set("debug", true)
mongoose.Promise = Promise;

// connect to the database
mongoose.connect(
    "mongodb+srv://kevin12345:kevin12345@warbler-nvqky.mongodb.net/warbler?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true
    }
)

// check mongoose connection
mongoose.connection.on("open", () => { console.log(`CONNECTED TO MONGODATA BASE TIMESTAMP: ${Date()}`) })
mongoose.connection.on("error", () => { console.error(`FAILED TO CONNECT TO THE DATABASE...`) })

// directory being imported on /handlers/auth.js
// bundles everything inside this directory
module.exports.User = require("./user");
module.exports.Message = require("./message");
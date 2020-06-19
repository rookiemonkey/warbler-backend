const db = require("../models");

exports.getAllMessages = async function(req, res, next) {
    
    try {

        // find all, sort descending, then populate the user key its username/picture
        const messages = await db.Message.find().sort({ createdAt: "desc" }).populate("user", {
            username:true, profilePicture:true
        })

        // return as json
        res.status(200).json(messages)
    }
    
    catch (err) {

        return next(err)

    }

}   
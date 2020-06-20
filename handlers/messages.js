const db = require("../models");

// POST - api/users/:id/message
exports.createMsg = async function(req, res, next) {
    try {
        // create the message
        const message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        })

        // find the user
        const foundUser= await db.User.findById(req.params.id)

        // push the created message to the user's messages
        foundUser.messages.shift(message)

        // save the user
        await foundUser.save()

        // look for the message and populate the user key for that message
        // so that we will not get only the message id, but also the username/pic
        // of the creator of the message
        const foundMsg = await db.Message.findById(message.id).populate("user", {
            username: true,
            profilePicture: true,
            creationDate: true
        })

        // respond back the found message to the client
        return res.status(201).json(foundMsg)
    }
    catch(err) {

        return next(err)

    }
}

// GET - api/users/:id/message/:message_id
exports.getMsg = async function(req, res, next) {
    try {
        const foundMessage = await db.Message.findById(req.params.message_id);
        return res.status(200).json(foundMessage);
    }

    catch (err) {
        return next(err);
    }
}

// DELETE - api/users/:id/message/:message_id
exports.deleteMsg = async function(req, res, next) {
    try {
        const foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove()
        res.status(200).json(foundMessage)
    }
    catch (err) {
        return next(err)
    }
}

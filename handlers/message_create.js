const Message = require('../models/message')

// POST - api/users/:id/message
const createMsg = async (req, res) => {
    try {
        // create the message
        const message = await Message.create({
            text: req.body.text,
            user: req.params.id
        })

        // find the user
        const foundUser = await db.User.findById(req.params.id)

        // push the created message to the user's messages
        foundUser.messages.shift(message)

        // save the user
        await foundUser.save()

        // look for the message and populate the user key for that message
        // so that we will not get only the message id, but also the username/pic
        // of the creator of the message
        const foundMsg = await Message.findById(message.id)
            .populate("user", {
                username: true,
                profilePicture: true,
                creationDate: true
            })

        // respond back the found message to the client
        return res
            .status(201)
            .json(foundMsg)
    }
    catch (err) {

        return next(err)

    }
}

module.exports = createMsg
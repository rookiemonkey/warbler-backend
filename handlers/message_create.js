const sanitizer = require('sanitizer');
const Message = require('../models/message')
const User = require('../models/user');

// POST - /api/message/:id
const createMsg = async (req, res, next) => {
    try {
        // find the user
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error("User doesn't exists") }

        // check valid inputs
        const validInputs = ['text', 'user']
        const areInputsValid = Object.keys(req.body).every(bodyInput => {
            return validInputs.includes(bodyInput)
        })
        if (!areInputsValid) { throw new Error("Invalid fields provided") }

        // create the message
        const message = await Message.create({
            text: sanitizer.escape(req.body.text),
            user: req.params.id
        })

        // push the created message to the user's messages
        foundUser.messages.push(message._id)

        // save the user
        await foundUser.save()

        // look for the message and populate the user key for that message
        // so that we will not get only the message id, but also the username/pic
        // of the creator of the message
        const foundMsg = await Message.findById(message.id)
            .populate("user", {
                username: true,
                profilePicture: true,
                createdAt: true
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
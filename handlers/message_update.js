const sanitizer = require('sanitizer');
const Message = require('../models/message')
const User = require('../models/user');

// PUT - /api/message/:id/:message_id
const updateMsg = async (req, res, next) => {
    try {
        // find the user
        const currentUser = await User.findById(req.params.id, `_id`)
        if (!currentUser) { throw new Error("User doesn't exists") }

        // find the message
        const foundMessage = await Message.findById(req.params.message_id, `user text`);
        if (!foundMessage) { throw new Error("Message doesn't exists") }

        // check if its the owner
        if (JSON.stringify(foundMessage.user) !== JSON.stringify(currentUser._id)) {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" })
        }

        // update/save the message
        foundMessage.text = sanitizer.escape(req.body.text);
        foundMessage.save();

        // respond back the found message to the client
        return res
            .status(200)
            .json({ result: 'Successfully updated your message' })
    }
    catch (err) {

        return next(err)

    }
}

module.exports = updateMsg;
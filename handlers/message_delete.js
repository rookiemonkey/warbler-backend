const Message = require('../models/message')
const User = require('../models/user')

// DELETE - /api/message/:id/:message_id
const deleteMsg = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id, `_id messages`);
        if (!currentUser) { throw new Error("User doesn't exists") }

        const foundMessage = await Message.findById(req.params.message_id, `_id user`);
        if (!foundMessage) { throw new Error("Message doesn't exists") }

        if (JSON.stringify(foundMessage.user) !== JSON.stringify(currentUser._id)) {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" })
        }

        const messageInUser = currentUser.messages.indexOf(JSON.stringify(foundMessage._id))
        currentUser.messages.splice(messageInUser, 1)

        await currentUser.save()
        await foundMessage.remove()

        return res
            .status(200)
            .json({ status: 200, removed: foundMessage })

    }
    catch (err) {

        return next(err)

    }
}

module.exports = deleteMsg
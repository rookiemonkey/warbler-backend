const Message = require('../models/message')
const User = require('../models/user')

// DELETE - api/users/:id/message/:message_id
const deleteMsg = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const foundMessage = await Message.findById(req.params.message_id);

        if (JSON.stringify(foundMessage.user._id) === JSON.stringify(currentUser._id)) {
            await foundMessage.remove()
            return res
                .status(200)
                .json({ status: 202, removed: foundMessage })

        } else {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" })
        }

    }
    catch (err) {

        return next(err)

    }
}

module.exports = deleteMsg
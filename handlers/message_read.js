const Message = require('../models/message')

// GET - api/users/:id/message/:message_id
const getMsg = async function (req, res, next) {
    try {
        const foundMessage = await Message.findById(req.params.message_id);
        return res
            .status(200)
            .json(foundMessage);
    }

    catch (err) {
        return next(err);
    }
}

module.exports = getMsg
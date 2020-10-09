const Message = require('../models/message')

const getMsgAllOfUser = async function (req, res, next) {
    try {

        // find all, sort descending, then populate the user key its username/picture
        const messages = await Message
            .find({ user: req.params.userid })
            .sort({ updatedAt: "desc" })
            .populate("user", `username profilePicture`)

        // return as json
        res
            .status(200)
            .json(messages)
    }

    catch (err) {

        return next(err)

    }

}

module.exports = getMsgAllOfUser;
const Message = require('../models/message')

const getMsgAll = async function (req, res, next) {
    try {

        // find all, sort descending, then populate the user key its username/picture
        const messages = await Message
            .find()
            .sort({ createdAt: "desc" })
            .populate("user", `username profilePicture`)
            .limit(20)
            .skip(req.query.skip) // add 20 every page/request eg: page 2 skips 20

        // return as json
        res
            .status(200)
            .json(messages)
    }

    catch (err) {

        return next(err)

    }

}

module.exports = getMsgAll
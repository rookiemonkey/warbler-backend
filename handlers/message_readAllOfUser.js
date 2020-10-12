const Message = require('../models/message')

const getMsgAllOfUser = async function (req, res, next) {
    try {

        // find all, sort descending, then populate the user key its username/picture
        const messages = await Message
            .find({ user: req.params.userid })
            .sort({ createdAt: "desc" })
            .populate("user", `username profilePicture`)
            .limit(20)
            .skip(parseInt(req.query.skip)) // add 20 every page/request eg: page 2 skips 20

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
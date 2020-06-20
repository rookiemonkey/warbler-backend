const mongoose = require("mongoose")
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

messageSchema.pre("remove", async function(next) {
    try {

        // find the user
        let user = await mongoose.model("User").findById(this.user);

        // remove the message  from the user using the message id
        user.messages.remove(this.id);

        //save the user again
        await user.save();

        // next()
        return next()
    }

    catch(err) {

        return next(err)

    }
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
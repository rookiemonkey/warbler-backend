const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Message = require("./message");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    accountCreation: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash;
        return next();
    }

    catch (err) {
        return next(err)
    }
})

userSchema.pre('remove', async function (next) {
    try {
        await Message.deleteMany({ user: this.id })

        return next();
    }

    catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async (candidatePassword, hash) => {
    try {
        return await bcrypt.compare(candidatePassword, hash)
    }

    catch (err) {
        return next(err)
    }
};

const User = mongoose.model("User", userSchema)

module.exports = User
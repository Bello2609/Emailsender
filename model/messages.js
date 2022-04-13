const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sendername: {
        type: String,
        required: true
    },
    recipientmail: {
        type: String,
        required: true
    },
    messages: {
        type: String,
        required: true,
        usersDetails: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
})
module.exports = mongoose.model("Messages", messageSchema);
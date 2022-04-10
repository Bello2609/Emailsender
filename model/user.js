const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchma = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("User", userSchma);
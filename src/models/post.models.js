const mongoose = require("mongoose");
const { post } = require("../app");
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" // here we are referring to the user model to whichever logged in user created the post it tell that this id belongs to which collection
    }
})

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
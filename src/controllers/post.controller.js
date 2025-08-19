const postModel = require("../models/post.models");
const generateCaption = require("../services/ai.service")
const uploadFile = require("../services/storage.service");
const {v4:uuidv4 }= require("uuid");

async function createPostController(req, res){
    const file = req.file;// file fetch
    console.log("File received:", file);
    const base64Image = new Buffer.from(file.buffer).toString('base64'); // convert to base64
    // console.log("Base64 Image:", base64Image);
    const caption = await generateCaption(base64Image); // generated caption
    console.log(caption);
    const result = await uploadFile(file.buffer, `${uuidv4()}`) // uploaded file on imagekit

    const post = await postModel.create({
        caption:caption,
        result: result.url,
        user: req.user._id
    })
    res.json({
        caption: caption,
        result: result.url,
        user: req.user._id
    })
    
    
    
}

module.exports = {
    createPostController
}
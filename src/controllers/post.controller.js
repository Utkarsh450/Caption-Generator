const postModel = require("../models/post.models");
const generateCaption = require("../services/ai.services")

async function createPostController(req, res){
    const file = req.file;
    console.log("File received:", file);
    const base64Image = new Buffer.from(file.buffer).toString('base64');
    // console.log("Base64 Image:", base64Image);
    const caption = await generateCaption(base64Image);
    console.log(caption);
    res.json({
        caption: caption
    })
    
    
    
}

module.exports = {
    createPostController
}
const mongoose = require("mongoose");

const achooData = mongoose.Schema({
    video_link : 
    {
        type: String,
        required: true,
        unique: true,
    } ,
    image_link : 
    {
        type: String,
        required: true,
        unique: true,
    } ,
    description : 
    {
        type: String,
        required: true,
        unique: true,
    } 

})

const AchooModel = new mongoose.model("achoo_entities",achooData)

module.exports = AchooModel
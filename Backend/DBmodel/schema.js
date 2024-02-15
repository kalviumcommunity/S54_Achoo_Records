const mongoose = require("mongoose");

const achooData = mongoose.Schema({
    video_link : String ,
    image_link : String ,
    description : String ,

})

const AchooModel = new mongoose.model("achoo_entities",achooData)

module.exports = AchooModel
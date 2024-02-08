const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDb = asyncHandler(async() => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
})

module.exports = connectDb
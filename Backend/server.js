const express = require("express");
const asyncHandler = require('express-async-handler')
const connectDb = require("./config/DbConnection");
const { connection, default: mongoose } = require("mongoose");
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())

connectDb()


app.get("/home",(req,res)=>{
    res.send(mongoose.connection.readyState === 1 ? "Database Connnected " : "Database Disonnected ")
})

app.listen(3000, (error) => {
    if (error) {
        console.error("Error starting the server:", error);
    } else {
        console.log("Server is running on localhost:3000");
    }
});

app.get("/ping",(req,res)=>{
    res.send("Ping route has been added")
})